import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import MainPage from "./pages/Main";
import Menu from "./pages/Menu";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard";
import Discount from "./pages/dashboard/discount";
import Statistics from "./pages/dashboard/statistics";
import Home from "./pages/dashboard/home";
import Test from "./pages/Test";
import AddItem from "./pages/dashboard/addOrEdit/AddItem";
import ChangePrice from "./pages/dashboard/changePrices";
import EditUser from "./pages/dashboard/home/EditUser";
import EditItem from "./pages/dashboard/addOrEdit/EditItems";

const router = createBrowserRouter([
  { path: "/m/:restaurantName", element: <Menu /> },
  { path: "/", element: <MainPage /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/", element: <Home /> },
      { path: "/dashboard/add", element: <AddItem /> },
      { path: "/dashboard/edit", element: <EditItem /> },
      { path: "/dashboard/price", element: <ChangePrice /> },
      { path: "/dashboard/discount", element: <Discount /> },
      { path: "/dashboard/statistic", element: <Statistics /> },
      { path: "/dashboard/edit-user", element: <EditUser /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/test", element: <Test /> },
]);

export default router;
