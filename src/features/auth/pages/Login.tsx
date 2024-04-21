import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { TAuthType } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/context/AuthContext";
import { Toast } from "../../../shared/components/toast/Toast";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [auth, setAuth] = useState<TAuthType>({
    email: "",
    password: "",
    code: "",
  });
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getData = (e: any) => {
    const { value, name } = e.target;
    setAuth(() => {
      return {
        ...auth,
        [name]: value,
      };
    });
  };

  const login = async () => {
    try {
      await signIn(auth.email, auth.password, auth.code);
      navigate("/admin");
    } catch (error) {
      setError(true);
      setErrorMessage("Something went wrong!!");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex justify-content-center text-4xl font-normal">
        Log in
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
                placeholder="Password"
                name="password"
                value={auth.password}
                onChange={(e) => getData(e)}
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
            <label className="text-sm">Code</label>
            <span className="p-input-icon-left">
              <i className="pi pi-envelope" />
              <InputText
                placeholder="Code"
                name="code"
                value={auth.code}
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
            label="Log in"
            severity="secondary"
            onClick={login}
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
          ></Button>
          <div className="flex justify-content-center px-4 py-2 font-normal text-sm">
            Not a member?&nbsp;
            <Link
              to="/registration"
              className="text-blue-500 no-underline text-sm font-medium"
            >
              Signup now
            </Link>
          </div>
        </div>
      </div>
      {isError && (
        <Toast severity="error" summary="Error" detail={errorMessage} />
      )}
    </div>
  );
};

export default Login;
