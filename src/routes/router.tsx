import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import Login from "../features/auth/pages/Login";
import AccessCode from "../features/auth/pages/AccessCode";
import Register from "../features/auth/pages/Register";
import PatientChat from "../features/chat/pages/PatientChat";

import { MainLayout } from "../layout";
import { CenterLayout } from "../layout";

export const routes = [
  {
    path: "/",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/access-code",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <AccessCode />,
      },
    ],
  },
  {
    path: "/registration",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/chat",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <PatientChat />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASENAME || "",
});

const Router = () => (
  <Suspense>
    <RouterProvider router={router} />
  </Suspense>
);

export { Router };
