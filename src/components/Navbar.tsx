import React, { useContext, useState } from "react";
import { UserContext } from "../Providers";
import { Avatar, Container, Flex, Text, Box } from "@radix-ui/themes";
import Logo from "./Logo";
import NavbarIcons from "./NavbarIcons";
import { PiListPlusBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav>
      <div className=" bg-orange-500 text-white vazir">
        <Container>
          <Flex justify="between" px="3" pt="3" align="center">
            <Flex>
              <Logo />
            </Flex>
            <Box display={{ initial: "none", md: "block" }} mx="5">
              <NavbarIcons />
            </Box>
            <Box p="2" mx="3" display={{ initial: "block", md: "none" }}>
              <button onClick={() => setShowMenu((prev) => !prev)}>
                <Text size="6">
                  <GiHamburgerMenu />
                </Text>
              </button>
            </Box>
          </Flex>

          {showMenu && (
            <Flex
              direction="column"
              display={{ md: "none" }}
              onClick={() => setShowMenu(false)}
              className={(showMenu ? "" : "max-h-0 ") + "transition-all"}
            >
              <NavbarIcons />
            </Flex>
          )}
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
