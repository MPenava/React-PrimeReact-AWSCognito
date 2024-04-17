import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const CognitoAuth = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    window.location.replace(import.meta.env.VITE_COGNITO_LOGIN_URL);
  };
  const handleImplicitLoginForm = () => {
    window.location.replace(
      import.meta.env.VITE_COGNITO_IMPLICIT_AUTH_LOGIN_URL
    );
  };

  const handleLoginForm = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex justify-content-center text-2xl font-normal">
        Cognito Auth
      </div>
      <div className="flex flex-column">
        <div className="flex flex-column gap-4">
          <Button
            label="Sign In"
            severity="secondary"
            onClick={handleSignIn}
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
          ></Button>
          <Button
            label="Sign In - Implicit"
            severity="secondary"
            onClick={handleImplicitLoginForm}
            pt={{
              root: { className: "p-2 w-full bg-green-800 border-round-sm" },
            }}
          ></Button>
          <Button
            label="Go to login"
            severity="secondary"
            onClick={handleLoginForm}
            pt={{
              root: { className: "p-2 w-full bg-blue-500 border-round-sm" },
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default CognitoAuth;
