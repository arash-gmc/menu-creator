import React, { useContext } from "react";
import { UserContext } from "../../Providers";
import { Box, Container, Flex, Tabs, Text } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./Profile";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const user = useContext(UserContext);
  return (
    <>
      <Navbar />
      <Container>
        <Flex justify="center" mt="5">
          <Box
            m="4"
            p="2"
            py="6"
            px={{ initial: "2", md: "8" }}
            className="border-2 rounded-2xl w-full vazir"
          >
            <Outlet />
          </Box>
        </Flex>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      </Container>
    </>
  );
};

export default Dashboard;
