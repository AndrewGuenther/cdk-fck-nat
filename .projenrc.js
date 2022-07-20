const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Andrew Guenther',
  authorAddress: 'guenther.andrew.j@gmail.com',
  cdkVersion: '1.129.0',
  defaultReleaseBranch: 'main',
  name: 'fck-nat-cdk',
  repositoryUrl: 'https://github.com/guenther.andrew.j/fck-nat-cdk.git',

  // cdkDependencies: undefined,      /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  // deps: [],                        /* Runtime dependencies of this module. */
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                     /* Build dependencies for this module. */
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
});
project.synth();