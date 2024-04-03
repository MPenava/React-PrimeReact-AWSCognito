import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

const Login = () => {
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
