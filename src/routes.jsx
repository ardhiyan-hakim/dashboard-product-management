import { lazy } from "react";
import Layout from "./layout/Layout";
import LandingLayout from "./layout/Layout/LandingLayout";
import { Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
const Login = lazy(() => import("./pages/Auth/Login/"));
const Dashboard = lazy(() => import("./pages/Dashboard/"));
const ProductList = lazy(() => import("./pages/Product/ProductList"));
const ProductDetail = lazy(() => import("./pages/Product/ProductDetail"));

const routes = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard />, index: true },
      { path: "products", element: <ProductList /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "*", element: <Navigate to="/dashboard" /> },
    ],
  },
];

export default routes;
