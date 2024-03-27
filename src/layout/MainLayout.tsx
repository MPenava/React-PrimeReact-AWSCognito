import { Sidebar } from "./components/sidebar";
import { Content } from "./components/content";
import mainitobaBackground from "../assets/manitoba_background.png";

const MainLayout = () => {
  return (
    <div style={{ background: `url(${mainitobaBackground})` }}>
      <div className="flex flex-column h-screen w-full">
        <div className="flex flex-column p-5" style={{ height: "inherit" }}>
          <div className="flex flex-row gap-5" style={{ height: "inherit" }}>
            <Sidebar />
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MainLayout };
