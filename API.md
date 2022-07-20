# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### FckNatInstanceProps <a name="FckNatInstanceProps" id="fck-nat-cdk.FckNatInstanceProps"></a>

Properties for a fck-nat instance.

#### Initializer <a name="Initializer" id="fck-nat-cdk.FckNatInstanceProps.Initializer"></a>

```typescript
import { FckNatInstanceProps } from 'fck-nat-cdk'

const fckNatInstanceProps: FckNatInstanceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#fck-nat-cdk.FckNatInstanceProps.property.instanceType">instanceType</a></code> | <code>@aws-cdk/aws-ec2.InstanceType</code> | Instance type of the fck-nat instance. |
| <code><a href="#fck-nat-cdk.FckNatInstanceProps.property.keyName">keyName</a></code> | <code>string</code> | Name of SSH keypair to grant access to instance. |
| <code><a href="#fck-nat-cdk.FckNatInstanceProps.property.machineImage">machineImage</a></code> | <code>@aws-cdk/aws-ec2.IMachineImage</code> | The machine image (AMI) to use. |
| <code><a href="#fck-nat-cdk.FckNatInstanceProps.property.securityGroup">securityGroup</a></code> | <code>@aws-cdk/aws-ec2.ISecurityGroup</code> | Security Group for fck-nat instances. |

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="fck-nat-cdk.FckNatInstanceProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* @aws-cdk/aws-ec2.InstanceType

Instance type of the fck-nat instance.

---

##### `keyName`<sup>Optional</sup> <a name="keyName" id="fck-nat-cdk.FckNatInstanceProps.property.keyName"></a>

```typescript
public readonly keyName: string;
```

- *Type:* string
- *Default:* No SSH access will be possible.

Name of SSH keypair to grant access to instance.

---

##### `machineImage`<sup>Optional</sup> <a name="machineImage" id="fck-nat-cdk.FckNatInstanceProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* @aws-cdk/aws-ec2.IMachineImage
- *Default:* Latest fck-nat instance image

The machine image (AMI) to use.

By default, will do an AMI lookup for the latest fck-nat instance image.

If you have a specific AMI ID you want to use, pass a `GenericLinuxImage`. For example:

```ts
FckNatInstanceProvider({
   instanceType: new ec2.InstanceType('t3.micro'),
   machineImage: new LookupMachineImage({
     name: 'fck-nat-amzn2-*-arm64-ebs',
     owners: ['568608671756'],
   })
})
```

---

##### `securityGroup`<sup>Optional</sup> <a name="securityGroup" id="fck-nat-cdk.FckNatInstanceProps.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* @aws-cdk/aws-ec2.ISecurityGroup
- *Default:* A new security group will be created

Security Group for fck-nat instances.

---

## Classes <a name="Classes" id="Classes"></a>

### FckNatInstanceProvider <a name="FckNatInstanceProvider" id="fck-nat-cdk.FckNatInstanceProvider"></a>

- *Implements:* @aws-cdk/aws-ec2.IConnectable

#### Initializers <a name="Initializers" id="fck-nat-cdk.FckNatInstanceProvider.Initializer"></a>

```typescript
import { FckNatInstanceProvider } from 'fck-nat-cdk'

new FckNatInstanceProvider(props: FckNatInstanceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.Initializer.parameter.props">props</a></code> | <code><a href="#fck-nat-cdk.FckNatInstanceProps">FckNatInstanceProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="fck-nat-cdk.FckNatInstanceProvider.Initializer.parameter.props"></a>

- *Type:* <a href="#fck-nat-cdk.FckNatInstanceProps">FckNatInstanceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.configureNat">configureNat</a></code> | Called by the VPC to configure NAT. |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.configureSubnet">configureSubnet</a></code> | Configures subnet with the gateway. |

---

##### `configureNat` <a name="configureNat" id="fck-nat-cdk.FckNatInstanceProvider.configureNat"></a>

```typescript
public configureNat(options: ConfigureNatOptions): void
```

Called by the VPC to configure NAT.

Don't call this directly, the VPC will call it automatically.

###### `options`<sup>Required</sup> <a name="options" id="fck-nat-cdk.FckNatInstanceProvider.configureNat.parameter.options"></a>

- *Type:* @aws-cdk/aws-ec2.ConfigureNatOptions

---

##### `configureSubnet` <a name="configureSubnet" id="fck-nat-cdk.FckNatInstanceProvider.configureSubnet"></a>

```typescript
public configureSubnet(subnet: PrivateSubnet): void
```

Configures subnet with the gateway.

Don't call this directly, the VPC will call it automatically.

###### `subnet`<sup>Required</sup> <a name="subnet" id="fck-nat-cdk.FckNatInstanceProvider.configureSubnet.parameter.subnet"></a>

- *Type:* @aws-cdk/aws-ec2.PrivateSubnet

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.gateway">gateway</a></code> | Use NAT Gateways to provide NAT services for your VPC. |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.instance">instance</a></code> | Use NAT instances to provide NAT services for your VPC. |

---

##### `gateway` <a name="gateway" id="fck-nat-cdk.FckNatInstanceProvider.gateway"></a>

```typescript
import { FckNatInstanceProvider } from 'fck-nat-cdk'

FckNatInstanceProvider.gateway(props?: NatGatewayProps)
```

Use NAT Gateways to provide NAT services for your VPC.

NAT gateways are managed by AWS.

> [https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)

###### `props`<sup>Optional</sup> <a name="props" id="fck-nat-cdk.FckNatInstanceProvider.gateway.parameter.props"></a>

- *Type:* @aws-cdk/aws-ec2.NatGatewayProps

---

##### `instance` <a name="instance" id="fck-nat-cdk.FckNatInstanceProvider.instance"></a>

```typescript
import { FckNatInstanceProvider } from 'fck-nat-cdk'

FckNatInstanceProvider.instance(props: NatInstanceProps)
```

Use NAT instances to provide NAT services for your VPC.

NAT instances are managed by you, but in return allow more configuration.

Be aware that instances created using this provider will not be
automatically replaced if they are stopped for any reason. You should implement
your own NatProvider based on AutoScaling groups if you need that.

> [https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html)

###### `props`<sup>Required</sup> <a name="props" id="fck-nat-cdk.FckNatInstanceProvider.instance.parameter.props"></a>

- *Type:* @aws-cdk/aws-ec2.NatInstanceProps

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.property.configuredGateways">configuredGateways</a></code> | <code>@aws-cdk/aws-ec2.GatewayConfig[]</code> | Return list of gateways spawned by the provider. |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.property.connections">connections</a></code> | <code>@aws-cdk/aws-ec2.Connections</code> | Manage the Security Groups associated with the NAT instances. |
| <code><a href="#fck-nat-cdk.FckNatInstanceProvider.property.securityGroup">securityGroup</a></code> | <code>@aws-cdk/aws-ec2.ISecurityGroup</code> | The Security Group associated with the NAT instances. |

---

##### `configuredGateways`<sup>Required</sup> <a name="configuredGateways" id="fck-nat-cdk.FckNatInstanceProvider.property.configuredGateways"></a>

```typescript
public readonly configuredGateways: GatewayConfig[];
```

- *Type:* @aws-cdk/aws-ec2.GatewayConfig[]

Return list of gateways spawned by the provider.

---

##### `connections`<sup>Required</sup> <a name="connections" id="fck-nat-cdk.FckNatInstanceProvider.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* @aws-cdk/aws-ec2.Connections

Manage the Security Groups associated with the NAT instances.

---

##### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="fck-nat-cdk.FckNatInstanceProvider.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* @aws-cdk/aws-ec2.ISecurityGroup

The Security Group associated with the NAT instances.

---



