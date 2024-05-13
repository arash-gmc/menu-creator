import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import MainPage from "./pages/Main";
import Menu from "./pages/Menu";
import Register from "./pages/auth/Register";
import Test from "./pages/Test";

const router = createBrowserRouter([
  { path: "/menus/:restaurantName", element: <Menu /> },
  { path: "/", element: <MainPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/test", element: <Test /> },
]);

export default router;
