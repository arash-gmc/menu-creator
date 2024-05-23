import React, { useContext } from "react";
import { UserContext } from "../../Providers";
import EmbededMenu from "./components/EmbededMenu";
import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const MyMenu = () => {
  const user = useContext(UserContext);
  if (!user) return null;
  return (
    <Flex direction="column" align="start" p="5">
      <Flex>
        <Text size="6" weight="bold">
          Menu URL:{" "}
        </Text>
        <Link to={"http://localhost:5173/m/" + user.name}>
          http://localhost:5137/m/{user.name}
        </Link>
      </Flex>
      <EmbededMenu name={user.name} />
    </Flex>
  );
};

export default MyMenu;
