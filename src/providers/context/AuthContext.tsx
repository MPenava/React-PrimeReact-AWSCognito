import { createContext, useContext, useState } from "react";
import { setCookie } from "../../helpers/cookies.helpers";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

type TAuthContext = {
  currentUser: CognitoUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    username: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  getSession: () => Promise<void>;
  confirmRegistration: (username: string, code: string) => Promise<void>;
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

const userpool = new CognitoUserPool(poolData);
//const userpool = {} as never;

const AuthContext = ({ children }: TAuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(null);

  const signIn = (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
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
          console.log("signIn");
          const cognitoUser = result;
          setCookie(
            "refresh_token",
            cognitoUser.getIdToken().getJwtToken(),
            "persistent"
          );
          setCookie(
            "access_token",
            cognitoUser.getIdToken().getJwtToken(),
            "persistent"
          );
          resolve();
        },
        onFailure: (error) => {
          console.error("Sign-in error:", error);
          reject(error);
        },
        mfaRequired: (challengeName) => {
          console.log("MFA required:", challengeName);
          user.sendMFACode("123456", {
            onSuccess: () => {
              console.log("MFA");
              console.log("MFA code sent successfully");
              resolve();
            },
            onFailure: (err) => {
              console.error("Failed to send MFA code:", err);
              reject(err);
            },
          });
        },
      });
    });
  };

  const signUp = (
    username: string,
    email: string,
    password: string,
    phone: string
  ) => {
    return new Promise<void>((resolve, reject) => {
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
            resolve();
            setCurrentUser(cognitoUser);
            return cognitoUser;
          } else {
            reject("User sign up result is undefined.");
          }
        }
      });
    });
  };

  const confirmRegistration = (username: string, code: string) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: userpool,
      });
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else {
          resolve();
          console.log("call result: " + result);
        }
      });
    });
  };

  const getSession = async () => {
    return await new Promise<void>((resolve, reject) => {
      const user = userpool.getCurrentUser();
      if (user) {
        user.getSession((err: any, session: any) => {
          if (err) {
            reject();
          } else {
            resolve(session);
            console.log(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const signOut = async () => {
    const user = userpool.getCurrentUser();
    if (user) {
      user.signOut();
      console.log("SignOut");
    }
    setCurrentUser(null);
  };

  return (
    <CognitoAuthContext.Provider
      value={{
        currentUser,
        signIn,
        signUp,
        signOut,
        confirmRegistration,
        getSession,
      }}
    >
      {children}
    </CognitoAuthContext.Provider>
  );
};

export default AuthContext;
