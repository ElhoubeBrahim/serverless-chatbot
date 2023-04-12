import { Amplify } from 'aws-amplify';
import awsconfig from '../secure/aws';

Amplify.configure({
  Auth: {
    region: awsconfig.REGION,
    userPoolId: awsconfig.USER_POOL_ID,
    userPoolWebClientId: awsconfig.USER_POOL_APP_CLIENT_ID,
  },
});
