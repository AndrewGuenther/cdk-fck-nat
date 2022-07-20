import { aws_ec2 as ec2 } from "aws-cdk-lib"
import { FckNatInstanceProvider } from '../../src'

export const ALL_ARM64_AMIS = ['fck-nat-amzn2-*-arm64-ebs']
export const ALL_X86_AMIS = ['fck-nat-amzn2-*-x86_64-ebs']

export function getFckNatProviders (
  amiOwner: string,
  instanceType: ec2.InstanceType,
  names: string[]
): FckNatInstanceProvider[] {
  const images: FckNatInstanceProvider[] = []

  for (const name of names) {
    images.push(new FckNatInstanceProvider({
      instanceType: instanceType,
      machineImage: new ec2.LookupMachineImage({
        name,
        owners: [amiOwner]
      })
    }))
  }

  return images
}

export function getNatInstanceProviders(
  amiOwner: string,
  instanceType: ec2.InstanceType,
  names: string[]
): ec2.NatInstanceProvider[] {
  const images: ec2.NatInstanceProvider[] = []

  for (const name of names) {
    images.push(new ec2.NatInstanceProvider({
      instanceType: instanceType,
      machineImage: new ec2.LookupMachineImage({
        name,
        owners: [amiOwner]
      })
    }))
  }

  return images
}
