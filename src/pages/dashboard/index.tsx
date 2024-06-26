import { Box, Container, Flex } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import "./disableDefaultForm.css";

const Dashboard = () => {
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
            className="border-2 rounded-2xl w-full select-none"
          >
            <Outlet />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Dashboard;
