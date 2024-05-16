import React, { useContext } from "react";
import { UserContext } from "../../Providers";
import { Box, Container, Flex, Tabs, Text } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./Profile";

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
            className="border-2 rounded-2xl w-full"
          >
            <Outlet />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Dashboard;
