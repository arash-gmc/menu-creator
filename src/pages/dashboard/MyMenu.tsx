import React, { useContext } from "react";
import { UserContext } from "../../Providers";
import EmbededMenu from "./components/EmbededMenu";
import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import QRCode from "../../components/QRCode";

const MyMenu = () => {
  const user = useContext(UserContext);
  if (!user) return null;
  const url = "http://localhost:5173/m/" + user.name;
  return (
    <Flex direction="column" align="start" p="5">
      <Flex>
        <Text size="6" weight="bold">
          Menu URL:{" "}
        </Text>
        <Link to={url}>Link to Menu</Link>
      </Flex>
      <EmbededMenu name={user.name} />
      <QRCode url={url} />
    </Flex>
  );
};

export default MyMenu;
