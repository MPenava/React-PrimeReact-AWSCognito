import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import Login from "../features/auth/pages/Login";

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
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
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
