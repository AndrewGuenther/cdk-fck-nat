import { awscdk } from 'projen';
import { DependabotScheduleInterval } from 'projen/lib/github';

const project = new awscdk.AwsCdkConstructLibrary({
  name: 'cdk-fck-nat',
  license: 'MIT',
  author: 'Andrew Guenther',
  authorAddress: 'guenther.andrew.j@gmail.com',
  repositoryUrl: 'https://github.com/AndrewGuenther/cdk-fck-nat.git',
  description: 'A NAT Gateway instance construct built on the fck-nat AMI.',
  majorVersion: 1.3,

  cdkVersion: '2.122.0',
  devDeps: ['dotenv'],

  dependabot: true,
  dependabotOptions: {
    scheduleInterval: DependabotScheduleInterval.MONTHLY,
  },
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
  jsiiVersion: '~5.3',
  typescriptVersion: '~5.3',
});

project.synth();
