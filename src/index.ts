import {
  aws_iam as iam,
  aws_autoscaling as autoscaling,
  aws_ec2 as ec2,
  Annotations,
} from 'aws-cdk-lib';

/**
 * Preferential set
 *
 * Picks the value with the given key if available, otherwise distributes
 * evenly among the available options.
 */
class PrefSet<A> {
  private readonly map: Record<string, A> = {};
  private readonly vals = new Array<[string, A]>();
  private next: number = 0;

  public add(pref: string, value: A) {
    this.map[pref] = value;
    this.vals.push([pref, value]);
  }

  public pick(pref: string): A {
    if (this.vals.length === 0) {
      throw new Error('Cannot pick, set is empty');
    }

    if (pref in this.map) { return this.map[pref]; }
    return this.vals[this.next++ % this.vals.length][1];
  }

  public values(): Array<[string, A]> {
    return this.vals;
  }
}

/**
 * Properties for a fck-nat instance
 */
export interface FckNatInstanceProps {
  /**
   * The machine image (AMI) to use
   *
   * By default, will do an AMI lookup for the latest fck-nat instance image.
   *
   * If you have a specific AMI ID you want to use, pass a `GenericLinuxImage`. For example:
   *
   * ```ts
   * FckNatInstanceProvider({
   *   instanceType: new ec2.InstanceType('t3.micro'),
   *   machineImage: new LookupMachineImage({
   *     name: 'fck-nat-amzn2-*-arm64-ebs',
   *     owners: ['568608671756'],
   *   })
   * })
   * ```
   *
   * @default - Latest fck-nat instance image
   */
  readonly machineImage?: ec2.IMachineImage;

  /**
   * Instance type of the fck-nat instance
   */
  readonly instanceType: ec2.InstanceType;

  /**
   * Name of SSH keypair to grant access to instance
   *
   * @default - No SSH access will be possible.
   */
  readonly keyName?: string;

  /**
   * Security Group for fck-nat instances
   *
   * @default - A new security group will be created
   */
  readonly securityGroup?: ec2.ISecurityGroup;
}

export class FckNatInstanceProvider extends ec2.NatProvider implements ec2.IConnectable {
  /**
   * The AMI name used internally when calling `LookupMachineImage`. Can be referenced if you wish to do AMI lookups
   * externally.
   */
  public static readonly AMI_NAME = 'fck-nat-amzn2-*-arm64-ebs';

  /**
   * The AMI owner used internally when calling `LookupMachineImage`. Can be referenced if you wish to do AMI lookups
   * externally.
   */
  public static readonly AMI_OWNER = '568608671756';

  private gateways: PrefSet<ec2.CfnNetworkInterface> = new PrefSet<ec2.CfnNetworkInterface>();
  private _securityGroup?: ec2.ISecurityGroup;
  private _connections?: ec2.Connections;
  private _role?: iam.Role;
  private _autoScalingGroups?: autoscaling.AutoScalingGroup[];

  constructor(private readonly props: FckNatInstanceProps) {
    super();
  }

  configureNat(options: ec2.ConfigureNatOptions): void {
    // Create the NAT instances. They can share a security group and a Role.
    const machineImage = this.props.machineImage || new ec2.LookupMachineImage({
      name: FckNatInstanceProvider.AMI_NAME,
      owners: [FckNatInstanceProvider.AMI_OWNER],
    });
    this._securityGroup = this.props.securityGroup ?? new ec2.SecurityGroup(options.vpc, 'NatSecurityGroup', {
      vpc: options.vpc,
      description: 'Security Group for NAT instances',
    });
    this._connections = new ec2.Connections({ securityGroups: [this._securityGroup] });

    // TODO: This should get buttoned up to only allow attaching ENIs created by this construct.
    this._role = new iam.Role(options.vpc, 'NatRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      inlinePolicies: {
        attachNatEniPolicy: new iam.PolicyDocument({
          statements: [new iam.PolicyStatement({
            actions: ['ec2:AttachNetworkInterface', 'ec2:ModifyNetworkInterfaceAttribute'],
            resources: ['*'],
          })],
        }),
      },
    });

    this._autoScalingGroups = [];
    for (const sub of options.natSubnets) {
      const networkInterface = new ec2.CfnNetworkInterface(
        sub, 'FckNatInterface', {
          subnetId: sub.subnetId,
          sourceDestCheck: false,
          groupSet: [this._securityGroup.securityGroupId],
        },
      );

      const userData = ec2.UserData.forLinux();
      userData.addCommands(`echo "eni_id=${networkInterface.ref}" >> /etc/fck-nat.conf`);
      userData.addCommands('service fck-nat restart');

      const autoScalingGroup = new autoscaling.AutoScalingGroup(
        sub, 'FckNatAsg', {
          instanceType: this.props.instanceType,
          machineImage,
          vpc: options.vpc,
          vpcSubnets: { subnets: [sub] },
          securityGroup: this._securityGroup,
          role: this._role,
          desiredCapacity: 1,
          userData: userData,
          keyName: this.props.keyName,
          groupMetrics: [autoscaling.GroupMetrics.all()],
        },
      );
      this._autoScalingGroups.push(autoScalingGroup);
      Annotations.of(autoScalingGroup).acknowledgeWarning('@aws-cdk/aws-autoscaling:desiredCapacitySet');
      // NAT instance routes all traffic, both ways
      this.gateways.add(sub.availabilityZone, networkInterface);
    }

    // Add routes to them in the private subnets
    for (const sub of options.privateSubnets) {
      this.configureSubnet(sub);
    }
  }

  configureSubnet(subnet: ec2.PrivateSubnet): void {
    const az = subnet.availabilityZone;
    const gatewayId = this.gateways.pick(az).ref;
    subnet.addRoute('DefaultRoute', {
      routerType: ec2.RouterType.NETWORK_INTERFACE,
      routerId: gatewayId,
      enablesInternetConnectivity: true,
    });
  }

  /**
   * The instance role attached with the NAT instances.
   */
  public get role(): iam.Role {
    if (!this._role) {
      throw new Error('Pass the NatInstanceProvider to a Vpc before accessing \'role\'');
    }
    return this._role;
  }

  /**
   * The ASGs (Auto Scaling Groups) managing the NAT instances. These can be retrieved to get metrics and
   */
  public get autoScalingGroups(): autoscaling.AutoScalingGroup[] {
    if (!this._autoScalingGroups) {
      throw new Error('Pass the NatInstanceProvider to a Vpc before accessing \'autoScalingGroups\'');
    }
    return this._autoScalingGroups;
  }

  /**
   * The Security Group associated with the NAT instances
   */
  public get securityGroup(): ec2.ISecurityGroup {
    if (!this._securityGroup) {
      throw new Error('Pass the NatInstanceProvider to a Vpc before accessing \'securityGroup\'');
    }
    return this._securityGroup;
  }

  /**
   * Manage the Security Groups associated with the NAT instances
   */
  public get connections(): ec2.Connections {
    if (!this._connections) {
      throw new Error('Pass the NatInstanceProvider to a Vpc before accessing \'connections\'');
    }
    return this._connections;
  }

  public get configuredGateways(): ec2.GatewayConfig[] {
    return this.gateways.values().map(x => ({ az: x[0], gatewayId: x[1].ref }));
  }
}
