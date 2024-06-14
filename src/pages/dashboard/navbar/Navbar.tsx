import { Container, Flex, Heading } from "@radix-ui/themes";
import { useContext } from "react";
import { UserContext } from "../../../Providers";
import LanguageSelector from "../../../components/LanguageSelector";
import Logo from "../../../components/Logo";
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
