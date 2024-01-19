import { awscdk } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  name: 'cdk-fck-nat',
  license: 'MIT',
  author: 'Andrew Guenther',
  authorAddress: 'guenther.andrew.j@gmail.com',
  repositoryUrl: 'https://github.com/AndrewGuenther/cdk-fck-nat.git',
  description: 'A NAT Gateway instance construct built on the fck-nat AMI.',
  majorVersion: 1,

  cdkVersion: '2.122.0',
  devDeps: ['dotenv'],

  dependabot: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['dependabot[bot]'],
  },

  defaultReleaseBranch: 'main',

  packageName: 'cdk-fck-nat',
  publishToPypi: {
    distName: 'cdk-fck-nat',
    module: 'cdk_fck_nat',
  },

  gitignore: ['.env', 'cdk.context.json', 'cdk.out'],

  projenrcTs: true,
});

project.synth();
