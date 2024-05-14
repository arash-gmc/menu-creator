import React, { useContext } from "react";
import { UserContext } from "../Providers";
import { Avatar, Container, Flex, Text } from "@radix-ui/themes";
import Logo from "./Logo";
import NavbarIcons from "./NavbarIcons";
import { PiListPlusBold } from "react-icons/pi";

const Navbar = () => {
  const user = useContext(UserContext);
  if (!user) return null;
  return (
    <nav>
      <div className="w-100 bg-orange-500 text-white">
        <Container>
          <Flex justify="between" pt="3">
            <Flex pt="2">
              <Logo />
            </Flex>
            <NavbarIcons />
            <Flex align="center" gap="3">
              <Text>{user.name}</Text>
              <Avatar
                fallback={user.name[0].toUpperCase()}
                color="indigo"
                variant="solid"
              />
            </Flex>
          </Flex>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
