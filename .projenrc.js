const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Andrew Guenther',
  authorAddress: 'guenther.andrew.j@gmail.com',
  cdkVersion: '1.129.0',
  defaultReleaseBranch: 'main',
  name: 'fck-nat-cdk',
  repositoryUrl: 'https://github.com/AndrewGuenther/fck-nat-cdk.git',

  cdkDependencies: ['@aws-cdk/aws-iam', '@aws-cdk/aws-autoscaling', '@aws-cdk/aws-ec2'], /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  // deps: [],                        /* Runtime dependencies of this module. */
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['dotenv'], /* Build dependencies for this module. */
  packageName: 'fck-nat-cdk', /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
});
project.addGitIgnore('.env');
project.addGitIgnore('cdk.context.json');
project.addGitIgnore('cdk.out');

project.synth();
