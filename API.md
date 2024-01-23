# CDK fck-nat

A CDK construct for deploying NAT Instances using [fck-nat](https://github.com/AndrewGuenther/fck-nat). The (f)easible (c)ost (k)onfigurable NAT!

* Overpaying for AWS Managed NAT Gateways? fck-nat.
* Want to use NAT instances and stay up-to-date with the latest security patches? fck-nat.
* Want to reuse your Bastion hosts as a NAT? fck-nat.

fck-nat offers a ready-to-use ARM and x86 based AMIs built on Amazon Linux 2 which can support up to 5Gbps NAT traffic
on a t4g.nano instance. How does that compare to a Managed NAT Gateway?

Hourly rates:
* Managed NAT Gateway hourly: $0.045
* t4g.nano hourly: $0.0042

Per GB rates:
* Managed NAT Gateway per GB: $0.045
* fck-nat per GB: $0.00

Sitting idle, fck-nat costs 10% of a Managed NAT Gateway. In practice, the savings are even greater.

*"But what about AWS' NAT Instance AMI?"*

The official AWS supported NAT Instance AMI hasn't been updates since 2018, is still running Amazon Linux 1 which is
now EOL, and has no ARM support, meaning it can't be deployed on EC2's most cost effective instance types. fck-nat.

*"When would I want to use a Managed NAT Gateway instead of fck-nat?"*

AWS limits outgoing internet bandwidth on EC2 instances to 5Gbps. This means that the highest bandwidth that fck-nat
can support is 5Gbps. This is enough to cover a very broad set of use cases, but if you need additional bandwidth,
you should use Managed NAT Gateway. If AWS were to lift the limit on internet egress bandwidth from EC2, you could
cost-effectively operate fck-nat at speeds up to 25Gbps, but you wouldn't need Managed NAT Gateway then would you?
fck-nat.

Read more about EC2 bandwidth limits here: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### FckNatInstanceProps <a name="FckNatInstanceProps" id="cdk-fck-nat.FckNatInstanceProps"></a>

Properties for a fck-nat instance.

#### Initializer <a name="Initializer" id="cdk-fck-nat.FckNatInstanceProps.Initializer"></a>

```typescript
import { FckNatInstanceProps } from 'cdk-fck-nat'

const fckNatInstanceProps: FckNatInstanceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-fck-nat.FckNatInstanceProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | Instance type of the fck-nat instance. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProps.property.eipPool">eipPool</a></code> | <code>string[]</code> | A list of EIP allocation IDs which can be attached to NAT instances. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProps.property.enableSsm">enableSsm</a></code> | <code>boolean</code> | Add necessary role permissions for SSM automatically. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProps.property.keyName">keyName</a></code> | <code>string</code> | Name of SSH keypair to grant access to instance. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The machine image (AMI) to use. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProps.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | Security Group for fck-nat instances. |

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="cdk-fck-nat.FckNatInstanceProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

Instance type of the fck-nat instance.

---

##### `eipPool`<sup>Optional</sup> <a name="eipPool" id="cdk-fck-nat.FckNatInstanceProps.property.eipPool"></a>

```typescript
public readonly eipPool: string[];
```

- *Type:* string[]

A list of EIP allocation IDs which can be attached to NAT instances.

The number of allocations supplied must be
greater than or equal to the number of egress subnets in your VPC.

---

##### `enableSsm`<sup>Optional</sup> <a name="enableSsm" id="cdk-fck-nat.FckNatInstanceProps.property.enableSsm"></a>

```typescript
public readonly enableSsm: boolean;
```

- *Type:* boolean
- *Default:* SSM is enabled

Add necessary role permissions for SSM automatically.

---

##### `keyName`<sup>Optional</sup> <a name="keyName" id="cdk-fck-nat.FckNatInstanceProps.property.keyName"></a>

```typescript
public readonly keyName: string;
```

- *Type:* string
- *Default:* No SSH access will be possible.

Name of SSH keypair to grant access to instance.

---

##### `machineImage`<sup>Optional</sup> <a name="machineImage" id="cdk-fck-nat.FckNatInstanceProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage
- *Default:* Latest fck-nat instance image

The machine image (AMI) to use.

By default, will do an AMI lookup for the latest fck-nat instance image.

If you have a specific AMI ID you want to use, pass a `GenericLinuxImage`. For example:

```ts
FckNatInstanceProvider({
  instanceType: new ec2.InstanceType('t3.micro'),
  machineImage: new LookupMachineImage({
    name: 'fck-nat-al2023-*-arm64-ebs',
    owners: ['568608671756'],
  })
})
```

---

##### `securityGroup`<sup>Optional</sup> <a name="securityGroup" id="cdk-fck-nat.FckNatInstanceProps.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup
- *Default:* A new security group will be created

Security Group for fck-nat instances.

---

## Classes <a name="Classes" id="Classes"></a>

### FckNatInstanceProvider <a name="FckNatInstanceProvider" id="cdk-fck-nat.FckNatInstanceProvider"></a>

- *Implements:* aws-cdk-lib.aws_ec2.IConnectable

#### Initializers <a name="Initializers" id="cdk-fck-nat.FckNatInstanceProvider.Initializer"></a>

```typescript
import { FckNatInstanceProvider } from 'cdk-fck-nat'

new FckNatInstanceProvider(props: FckNatInstanceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-fck-nat.FckNatInstanceProps">FckNatInstanceProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-fck-nat.FckNatInstanceProvider.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-fck-nat.FckNatInstanceProps">FckNatInstanceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.configureNat">configureNat</a></code> | Called by the VPC to configure NAT. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.configureSubnet">configureSubnet</a></code> | Configures subnet with the gateway. |

---

##### `configureNat` <a name="configureNat" id="cdk-fck-nat.FckNatInstanceProvider.configureNat"></a>

```typescript
public configureNat(options: ConfigureNatOptions): void
```

Called by the VPC to configure NAT.

Don't call this directly, the VPC will call it automatically.

###### `options`<sup>Required</sup> <a name="options" id="cdk-fck-nat.FckNatInstanceProvider.configureNat.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_ec2.ConfigureNatOptions

---

##### `configureSubnet` <a name="configureSubnet" id="cdk-fck-nat.FckNatInstanceProvider.configureSubnet"></a>

```typescript
public configureSubnet(subnet: PrivateSubnet): void
```

Configures subnet with the gateway.

Don't call this directly, the VPC will call it automatically.

###### `subnet`<sup>Required</sup> <a name="subnet" id="cdk-fck-nat.FckNatInstanceProvider.configureSubnet.parameter.subnet"></a>

- *Type:* aws-cdk-lib.aws_ec2.PrivateSubnet

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.gateway">gateway</a></code> | Use NAT Gateways to provide NAT services for your VPC. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.instance">instance</a></code> | Use NAT instances to provide NAT services for your VPC. |

---

##### `gateway` <a name="gateway" id="cdk-fck-nat.FckNatInstanceProvider.gateway"></a>

```typescript
import { FckNatInstanceProvider } from 'cdk-fck-nat'

FckNatInstanceProvider.gateway(props?: NatGatewayProps)
```

Use NAT Gateways to provide NAT services for your VPC.

NAT gateways are managed by AWS.

> [https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)

###### `props`<sup>Optional</sup> <a name="props" id="cdk-fck-nat.FckNatInstanceProvider.gateway.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_ec2.NatGatewayProps

---

##### `instance` <a name="instance" id="cdk-fck-nat.FckNatInstanceProvider.instance"></a>

```typescript
import { FckNatInstanceProvider } from 'cdk-fck-nat'

FckNatInstanceProvider.instance(props: NatInstanceProps)
```

Use NAT instances to provide NAT services for your VPC.

NAT instances are managed by you, but in return allow more configuration.

Be aware that instances created using this provider will not be
automatically replaced if they are stopped for any reason. You should implement
your own NatProvider based on AutoScaling groups if you need that.

> [https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html)

###### `props`<sup>Required</sup> <a name="props" id="cdk-fck-nat.FckNatInstanceProvider.instance.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_ec2.NatInstanceProps

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.property.configuredGateways">configuredGateways</a></code> | <code>aws-cdk-lib.aws_ec2.GatewayConfig[]</code> | Return list of gateways spawned by the provider. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.property.autoScalingGroups">autoScalingGroups</a></code> | <code>aws-cdk-lib.aws_autoscaling.AutoScalingGroup[]</code> | The ASGs (Auto Scaling Groups) managing the NAT instances. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Manage the Security Groups associated with the NAT instances. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | The instance role attached with the NAT instances. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | The Security Group associated with the NAT instances. |

---

##### `configuredGateways`<sup>Required</sup> <a name="configuredGateways" id="cdk-fck-nat.FckNatInstanceProvider.property.configuredGateways"></a>

```typescript
public readonly configuredGateways: GatewayConfig[];
```

- *Type:* aws-cdk-lib.aws_ec2.GatewayConfig[]

Return list of gateways spawned by the provider.

---

##### `autoScalingGroups`<sup>Required</sup> <a name="autoScalingGroups" id="cdk-fck-nat.FckNatInstanceProvider.property.autoScalingGroups"></a>

```typescript
public readonly autoScalingGroups: AutoScalingGroup[];
```

- *Type:* aws-cdk-lib.aws_autoscaling.AutoScalingGroup[]

The ASGs (Auto Scaling Groups) managing the NAT instances.

These can be retrieved to get metrics and

---

##### `connections`<sup>Required</sup> <a name="connections" id="cdk-fck-nat.FckNatInstanceProvider.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Manage the Security Groups associated with the NAT instances.

---

##### `role`<sup>Required</sup> <a name="role" id="cdk-fck-nat.FckNatInstanceProvider.property.role"></a>

```typescript
public readonly role: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

The instance role attached with the NAT instances.

---

##### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="cdk-fck-nat.FckNatInstanceProvider.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

The Security Group associated with the NAT instances.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.property.AMI_NAME">AMI_NAME</a></code> | <code>string</code> | The AMI name used internally when calling `LookupMachineImage`. |
| <code><a href="#cdk-fck-nat.FckNatInstanceProvider.property.AMI_OWNER">AMI_OWNER</a></code> | <code>string</code> | The AMI owner used internally when calling `LookupMachineImage`. |

---

##### `AMI_NAME`<sup>Required</sup> <a name="AMI_NAME" id="cdk-fck-nat.FckNatInstanceProvider.property.AMI_NAME"></a>

```typescript
public readonly AMI_NAME: string;
```

- *Type:* string

The AMI name used internally when calling `LookupMachineImage`.

Can be referenced if you wish to do AMI lookups
externally.

---

##### `AMI_OWNER`<sup>Required</sup> <a name="AMI_OWNER" id="cdk-fck-nat.FckNatInstanceProvider.property.AMI_OWNER"></a>

```typescript
public readonly AMI_OWNER: string;
```

- *Type:* string

The AMI owner used internally when calling `LookupMachineImage`.

Can be referenced if you wish to do AMI lookups
externally.

---


