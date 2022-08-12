const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  name: 'cdk-fck-nat',
  license: 'MIT',
  author: 'Andrew Guenther',
  authorAddress: 'guenther.andrew.j@gmail.com',
  repositoryUrl: 'https://github.com/AndrewGuenther/cdk-fck-nat.git',
  description: 'A NAT Gateway instance construct built on the fck-nat AMI.',
  majorVersion: 1,

  cdkVersion: '2.33.0',
  devDeps: ['dotenv'],
  autoApproveUpgrades: true,
  autoApproveOptions: {
    label: 'auto-approve',
  },

  buildWorkflow: true,
  buildWorkflowTriggers: {
    pullRequest: {},
    workflowDispatch: {},
    push: {
      branches: ['main'],
    },
  },

  release: true,
  defaultReleaseBranch: 'release',
  packageName: 'cdk-fck-nat',
  publishToPypi: {
    distName: 'cdk-fck-nat',
    module: 'cdk_fck_nat',
  },

  gitignore: ['.env', 'cdk.context.json', 'cdk.out'],
});

project.synth();
