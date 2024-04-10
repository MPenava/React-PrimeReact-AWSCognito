import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const CognitoAuth = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    window.location.replace(
      "https://primereact-example.auth.eu-north-1.amazoncognito.com/login?client_id=5575h78s6q60tlvv8gmjvfvqiu&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fadmin"
    );
  };

  const handleSignUp = () => {
    window.location.replace(
      "https://primereact-example.auth.eu-north-1.amazoncognito.com/signup?client_id=5575h78s6q60tlvv8gmjvfvqiu&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fadmin"
    );
  };

  const handleLoginForm = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex justify-content-center text-4xl font-normal">
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
            label="Sign Up"
            severity="secondary"
            onClick={handleSignUp}
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
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
