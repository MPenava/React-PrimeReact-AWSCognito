import { createContext, useContext, useState } from "react";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  CookieStorage,
} from "amazon-cognito-identity-js";

type TAuthContext = {
  currentUser: CognitoUser | null;
  signIn: (email: string, password: string, code: string) => Promise<void>;
  sendMFACode: (email: string, code: string) => Promise<void>;
  signUp: (
    username: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
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
  Storage: new CookieStorage({ domain: "localhost" }),
};

const userpool = new CognitoUserPool(poolData);
//const userpool = {} as never;

const AuthContext = ({ children }: TAuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(null);

  const signIn = (email: string, password: string, code: string) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userpool,
        Storage: new CookieStorage({ domain: "localhost" }),
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log(result);
          resolve();
        },
        onFailure: (error) => {
          console.error("Sign-in error:", error);
          reject(error);
        },
        totpRequired: () => {
          user.sendMFACode(
            code,
            {
              onSuccess: (result) => {
                const cognitoUser = result;
                console.log(result);
                resolve();
              },
              onFailure: (error) => {
                console.error("MFA totp:", error);
                reject(error);
              },
            },
            "SOFTWARE_TOKEN_MFA"
          );
        },
      });
    });
  };

  const sendMFACode = async (username: string, code: string) => {
    const userData = {
      Username: username,
      Pool: userpool,
    };

    const cognitoUser = new CognitoUser(userData);
    console.log(cognitoUser);

    return new Promise<void>((resolve, reject) => {
      cognitoUser.sendMFACode(
        code,
        {
          onSuccess: () => {
            resolve();
          },
          onFailure: (err) => {
            reject(err);
          },
        },
        "SOFTWARE_TOKEN_MFA"
      );
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

  const getCurrentUser = async () => {
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
        sendMFACode,
        signIn,
        signUp,
        signOut,
        confirmRegistration,
        getCurrentUser,
      }}
    >
      {children}
    </CognitoAuthContext.Provider>
  );
};

export default AuthContext;
