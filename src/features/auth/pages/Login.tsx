import authenticate from "../../../helpers/authenticate";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import { useState } from "react";

type TAuthType = {
  email: string;
  password: string;
};

const Login = () => {
  const [auth, setAuth] = useState<TAuthType>({ email: "", password: "" });

  const getData = (e: any) => {
    const { value, name } = e.target;
    setAuth(() => {
      return {
        ...auth,
        [name]: value,
      };
    });
  };

  const login = (email: string, password: string) => {
    authenticate(email, password).then((data) => {
      console.log("SUCCESS");
      console.log(data);
    });
  };
  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex justify-content-center text-4xl font-normal">
        Log in
      </div>
      <div className="flex flex-column gap-3">
        <div className="flex flex-column gap-2">
          <div className="flex flex-column">
            <label className="text-sm">Email</label>
            <span className="p-input-icon-left">
              <i className="pi pi-envelope" />
              <InputText
                placeholder="Email"
                pt={{
                  root: { className: "w-full" },
                }}
                value={auth.email}
              />
            </span>
            <small>Enter your email.</small>
          </div>
          <div className="flex flex-column w-full">
            <label className="text-sm">Password</label>
            <span className="p-input-icon-left w-full">
              <Password
                placeholder="Password"
                pt={{
                  root: { className: "w-full" },
                  input: { className: "w-full pl-5" },
                }}
                value={auth.password}
              />
              <i className="pi pi-lock" />
            </span>
            <small>Enter your password.</small>
          </div>
        </div>
        <div className="flex flex-column gap-2">
          <Button
            label="Log in"
            severity="secondary"
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
          ></Button>
          <div className="flex justify-content-center px-4 py-2 font-semibold">
            Forgot password
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
