import { MenuItem } from "primereact/menuitem";

const listItems: MenuItem[] = [
  {
    label: "DASHBOARD",
    icon: "pi pi-th-large",
  },
  {
    label: "READY TO SENT",
    icon: "pi pi-send",
  },
  {
    label: "SCRIBED NOTES",
    icon: "pi pi-pencil",
  },
  {
    label: "NOTIFICATIONS",
    icon: "pi pi-times",
  },
];

const actionItems: MenuItem[] = [
  {
    label: "SETTINGS",
    icon: "pi pi-cog",
  },
  {
    label: "LOGOUT",
    icon: "pi pi-sign-out",
    command: () => {
      window.location.replace(import.meta.env.VITE_COGNITO_LOGOUT_URL);
    },
  },
];

export { listItems, actionItems };
