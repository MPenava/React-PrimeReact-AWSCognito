import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import Login from "../features/auth/pages/Login";
import AccessCode from "../features/auth/pages/AccessCode";
import Register from "../features/auth/pages/Register";
import ResetPassword from "../features/auth/pages/ResetPassword";
import CognitoAuth from "../features/auth/pages/CognitoAuth";
import { MainLayout } from "../layout";
import { CenterLayout } from "../layout";

export const routes = [
  {
    path: "/",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <CognitoAuth />,
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
    path: "/reset-password",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <ResetPassword />,
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
];

const router = createBrowserRouter(routes, {
  basename: "",
});

const Router = () => (
  <Suspense>
    <RouterProvider router={router} />
  </Suspense>
);

export { Router };
