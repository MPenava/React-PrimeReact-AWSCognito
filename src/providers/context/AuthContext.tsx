import { createContext, useContext, useState } from "react";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

type TAuthContext = {
  currentUser: CognitoUser | null;
  signIn: (email: string, password: string) => void;
  signUp: (
    username: string,
    email: string,
    password: string,
    phone: string
  ) => void;
};

type TAuthContextProps = {
  children: JSX.Element;
};

const CognitoAuthContext = createContext<TAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(CognitoAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
};

//const userpool = new CognitoUserPool(poolData);
const userpool = {} as never;

const AuthContext = ({ children }: TAuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(null);

  const signIn = (email: string, password: string) => {
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
        console.log(result);
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
  };

  const signUp = (
    username: string,
    email: string,
    password: string,
    phone: string
  ) => {
    return new Promise((resolve, reject) => {
      const attributeList = [];

      const attributeEmail = new CognitoUserAttribute({
        Name: "email",
        Value: email,
      });

      const attributePhone = new CognitoUserAttribute({
        Name: "phone_number",
        Value: phone,
      });

      attributeList.push(attributeEmail);
      attributeList.push(attributePhone);

      userpool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else {
          if (result) {
            const cognitoUser = result.user;
            resolve(
              "User signed up successfully. Username: " +
                cognitoUser.getUsername()
            );
            setCurrentUser(cognitoUser);
          } else {
            reject("User sign up result is undefined.");
          }
        }
      });
    });
  };
  return (
    <CognitoAuthContext.Provider value={{ currentUser, signIn, signUp }}>
      {children}
    </CognitoAuthContext.Provider>
  );
};

export default AuthContext;
