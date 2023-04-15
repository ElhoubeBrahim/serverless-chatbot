import { Amplify, Auth } from 'aws-amplify';
import api from '../secure/api';
import awsconfig from '../secure/aws';

Amplify.configure({
  Auth: {
    region: awsconfig.REGION,
    userPoolId: awsconfig.USER_POOL_ID,
    userPoolWebClientId: awsconfig.USER_POOL_APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: api.name,
        endpoint: api.serverUrl,
        custom_header: async () => {
          return {
            Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          };
        },
      },
    ],
  },
});
