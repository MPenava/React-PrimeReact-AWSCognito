import { Outlet } from "react-router-dom";
const Content = () => {
  return (
    <div className="shadow-5 h-full w-full bg-white border-round-xl">
      <Outlet />
    </div>
  );
};

export { Content };
