import { Outlet } from "react-router-dom";
const LoginContent = () => {
  return (
    <div className="flex flex-row justify-content-center">
      <Outlet />
    </div>
  );
};

export { LoginContent };
