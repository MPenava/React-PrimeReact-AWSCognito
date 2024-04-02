import { Menu } from "primereact/menu";

import { listItems } from "../../../hooks";

const SidebarList = () => {
  return (
    <div className="flex justify-content-center">
      <Menu
        model={listItems}
        pt={{
          root: { className: "bg-transparent border-none" },
          action: {
            className: "focus:bg-gray-800 hover:bg-gray-800 border-round-sm",
          },
          menuitem: {
            className: "w-full text-md font-semibold",
          },
          icon: { className: "font-semibold" },
        }}
      />
    </div>
  );
};
export { SidebarList };
