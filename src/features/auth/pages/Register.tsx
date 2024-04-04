import authenticate from "../../../helpers/authenticate";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { TAuthType } from "../types";

const Register = () => {
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

  const register = () => {
    authenticate(auth.email, auth.password).then((data) => {
      console.log("SUCCESS");
      console.log(data);
    });
  };

  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex justify-content-center text-4xl font-normal">
        Sign up
      </div>
      <div className="flex flex-column gap-5">
        <div className="flex flex-column gap-5">
          <div className="flex flex-column gap-2">
            <label className="text-sm">Email</label>
            <span className="p-input-icon-left">
              <i className="pi pi-envelope" />
              <InputText
                placeholder="Email"
                name="email"
                value={auth.email}
                onChange={(e) => getData(e)}
                pt={{
                  root: { className: "w-full" },
                }}
              />
            </span>
          </div>
          <div className="flex flex-column w-full gap-2">
            <label className="text-sm">Password</label>
            <span className="p-input-icon-left w-full">
              <Password
                name="password"
                value={auth.password}
                onChange={(e) => getData(e)}
                placeholder="Password"
                pt={{
                  root: { className: "w-full" },
                  input: { className: "w-full pl-5" },
                }}
              />
              <i className="pi pi-lock" />
            </span>
          </div>
        </div>
        <div className="flex flex-column gap-2">
          <Button
            label="Log in"
            severity="secondary"
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
            onClick={register}
          ></Button>
          <div className="flex justify-content-center px-4 py-2 font-semibold">
            Forgot password
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
