import { signUp } from "../../../helpers";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { TAuthRegisterType } from "../types";

const Register = () => {
  const [auth, setAuth] = useState<TAuthRegisterType>({
    email: "",
    password: "",
    phone: "",
  });

  const getData = (e: any) => {
    const { value, name } = e.target;
    setAuth(() => {
      return {
        ...auth,
        [name]: value,
      };
    });
  };

  const handleRegisterForm = async () => {
    const username = auth.email.split("@")[0];
    signUp(username, auth.email, auth.password, auth.phone).then((data) => {
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
          <div className="flex flex-column gap-2">
            <label className="text-sm">Password</label>
            <span className="p-input-icon-left">
              <Password
                name="password"
                value={auth.password}
                onChange={(e) => getData(e)}
                placeholder="Password"
                feedback={false}
                toggleMask
                pt={{
                  root: { className: "w-full" },
                  input: { className: "w-full pl-5" },
                }}
              />
              <i className="pi pi-lock" />
            </span>
          </div>
          <div className="flex flex-column gap-2">
            <label className="text-sm">Phone</label>
            <span className="p-input-icon-left">
              <i className="pi pi-phone" />
              <InputText
                placeholder="Phone"
                name="phone"
                value={auth.phone}
                onChange={(e) => getData(e)}
                pt={{
                  root: { className: "w-full" },
                }}
              />
            </span>
          </div>
        </div>
        <div className="flex flex-column gap-2">
          <Button
            label="Continue"
            severity="secondary"
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
            onClick={handleRegisterForm}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
