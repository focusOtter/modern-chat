# Modern Chat app

## Steps to get started

0. Create rooms in the AWS Console (`createRoom` mutation)
1. Run `amplify init`
2. Run `amplify add codegen --apiId YOUR_APPID`
3. `amplify codegen` (accept the defaults, but set the max-depth to 4)

Bring over the values from your CDK backend and ensure
your project looks like the `sample.aws-exports.js` file.
