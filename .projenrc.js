const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Andrew Guenther',
  authorAddress: 'guenther.andrew.j@gmail.com',
  cdkVersion: '2.33.0',
  defaultReleaseBranch: 'release',
  name: 'fck-nat-cdk',
  license: 'MIT',
  repositoryUrl: 'https://github.com/AndrewGuenther/cdk-fck-nat.git',
  description: 'A NAT Gateway instance construct built on the fck-nat AMI.',
  devDeps: ['dotenv'],
  packageName: 'cdk-fck-nat',
  autoApproveUpgrades: true,
  autoApproveOptions: {
    label: 'auto-approve',
  },
  buildWorkflow: true,
  release: true,
  gitignore: ['.env', 'cdk.context.json', 'cdk.out'],
  publishToPypi: {
    distName: 'cdk-fck-nat',
    module: 'cdk_fck_nat',
  },
});

project.synth();
