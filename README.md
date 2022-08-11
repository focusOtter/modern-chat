# Modern Chat app
![ezgif-5-31ccf9d033](https://user-images.githubusercontent.com/5106417/184162547-1a3ab9b4-8f91-4a81-be58-f6af35469e02.gif)

## Steps to get started

1. Run `amplify init`
2. Run `amplify add codegen --apiId YOUR_APPID`
3. `amplify codegen` (accept the defaults, but set the max-depth to 4)
4. Bring over the values from your CDK backend and ensure your project looks like the `sample.aws-exports.js` file.
5. Run the app and create 2 users
6. Create rooms in the AWS Console (`createRoom` mutation)
7. You should now be able to view the rooms on the homepage. Click one and begin creating messages.
