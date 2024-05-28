import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import MainPage from "./pages/Main";
import Menu from "./pages/Menu";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/dashboard/Profile";
import AddItem from "./pages/dashboard/AddItem";
import EditItem from "./pages/dashboard/EditItem";
import ChangePrice from "./pages/dashboard/ChangePrice";
import Discount from "./pages/dashboard/Discount";
import Statistics from "./pages/dashboard/Statistics";
import MyMenu from "./pages/dashboard/MyMenu";
import Test from "./pages/Test";

const router = createBrowserRouter([
  { path: "/m/:restaurantName", element: <Menu /> },
  { path: "/", element: <MainPage /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/mymenu", element: <MyMenu /> },
      { path: "/dashboard/add", element: <AddItem /> },
      { path: "/dashboard/edit", element: <EditItem /> },
      { path: "/dashboard/price", element: <ChangePrice /> },
      { path: "/dashboard/discount", element: <Discount /> },
      { path: "/dashboard/statistic", element: <Statistics /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/test", element: <Test /> },
]);

export default router;
