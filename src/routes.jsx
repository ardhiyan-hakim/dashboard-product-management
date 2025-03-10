import { lazy } from "react";

const Login = lazy(() => import("./pages/Auth/Login/"));
const Dashboard = lazy(() => import("./pages/Dashboard/"));
const ProductList = lazy(() => import("./pages/Product/ProductList"));
const ProductDetail = lazy(() => import("./pages/Product/ProductDetail"));

const routes = [
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/products", element: <ProductList /> },
  { path: "/products/:id", element: <ProductDetail /> },
];

export default routes;