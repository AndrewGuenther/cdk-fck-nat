/* eslint-disable no-new */

import { Stack, StackProps, aws_ec2 as ec2 } from "aws-cdk-lib"
import { Construct } from "constructs"
import { FckNatVpc } from './fck-nat-vpc'

interface FckNatTestStackProps extends StackProps {
  readonly natInstanceProviders: Array<ec2.NatProvider & ec2.IConnectable>
}

export class FckNatTestStack extends Stack {
  constructor (scope: Construct, id: string, props: FckNatTestStackProps) {
    super(scope, id, props)

    for (const [idx, natInstanceProvider] of props.natInstanceProviders.entries()) {
      // There's definitely something better than an index to use here, but it would be a pain to plumb through
      new FckNatVpc(this, `fck-nat-vpc-${idx}`, { natInstanceProvider })
    }
  }
}
