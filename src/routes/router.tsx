import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import Login from "../features/login/pages/Login";

import { MainLayout } from "../layout";
import { CenterLayout } from "../layout";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <Login />,
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
