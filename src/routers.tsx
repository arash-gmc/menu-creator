import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainPage from "./pages/Main";
import Menu from "./pages/Menu";
import Register from "./pages/Register";

const router = createBrowserRouter([
  { path: "/menus/:restaurantName", element: <Menu /> },
  { path: "/", element: <MainPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
