/* eslint-disable no-new */

import { Construct } from "constructs"
import { Tags, StackProps, aws_ec2 as ec2 } from "aws-cdk-lib"

interface FckNatVpcProps extends StackProps {
  readonly natInstanceProvider: ec2.NatProvider & ec2.IConnectable
}

export class FckNatVpc extends Construct {
  vpc: ec2.Vpc

  constructor (scope: Construct, id: string, props: FckNatVpcProps) {
    super(scope, id)

    const publicSubnetCfg: ec2.SubnetConfiguration = {
      name: 'public-subnet',
      subnetType: ec2.SubnetType.PUBLIC,
      cidrMask: 24,
      reserved: false
    }
    const privateSubnetCfg: ec2.SubnetConfiguration = {
      name: 'private-subnet',
      subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      cidrMask: 24,
      reserved: false
    }

    this.vpc = new ec2.Vpc(this, 'vpc', {
      maxAzs: 1,
      subnetConfiguration: [publicSubnetCfg, privateSubnetCfg],
      natGatewayProvider: props.natInstanceProvider
    })

    props.natInstanceProvider.connections.allowFrom(ec2.Peer.ipv4(this.vpc.vpcCidrBlock), ec2.Port.allTraffic())

    const bastion = new ec2.BastionHostLinux(this, 'BastionHost', {
      vpc: this.vpc
    })

    Tags.of(bastion).add('connectivity-test-target', 'true')
  }
}
