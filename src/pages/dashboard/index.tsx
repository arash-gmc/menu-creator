import React, { useContext } from "react";
import { UserContext } from "../../Providers";
import { Box, Container, Tabs, Text } from "@radix-ui/themes";
import AddItemField from "../../components/AddItemField";
import Navbar from "../../components/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./Profile";

const Dashboard = () => {
  const user = useContext(UserContext);
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Dashboard;
