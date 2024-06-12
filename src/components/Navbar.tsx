import React, { useContext, useState } from "react";
import { UserContext } from "../Providers";
import { Avatar, Container, Flex, Text, Box, Heading } from "@radix-ui/themes";
import Logo from "./Logo";
import NavbarIcons from "./NavbarIcons";
import { PiListPlusBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  const user = useContext(UserContext);
  if (!user) return null;
  return (
    <nav>
      <div className=" bg-orange-500 text-white vazir">
        <Container>
          <Flex justify="between" px="3" py="3" align="center">
            <Logo />
            <LanguageSelector />
            <Flex gap="4" align="center">
              <Heading size="6">{user.title}</Heading>
              <NavbarMenu />
            </Flex>
          </Flex>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
