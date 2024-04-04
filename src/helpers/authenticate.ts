import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: `${import.meta.env.VITE_COGNITO_USER_POOL_ID}`,
  ClientId: `${import.meta.env.VITE_COGNITO_CLIENT_ID}`,
};

const userpool = new CognitoUserPool(poolData);

const authenticate = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userpool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export default authenticate;