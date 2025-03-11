import { lazy } from "react";
import Layout from "./layout/Layout";
import { Navigate } from "react-router-dom";

const Login = lazy(() => import("./pages/Auth/Login/"));
const Dashboard = lazy(() => import("./pages/Dashboard/"));
const ProductList = lazy(() => import("./pages/Product/ProductList"));
const ProductDetail = lazy(() => import("./pages/Product/ProductDetail"));

const routes = [
  { path: "/", element: <Login /> },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "*", element: <Navigate to="/dashboard" /> },
    ],
  },
];

export default routes;
