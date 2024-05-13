import React, { useContext } from "react";
import { UserContext } from "../../Providers";
import { Box, Container, Tabs, Text } from "@radix-ui/themes";
import AddItemField from "../../components/AddItemField";

const Dashboard = () => {
  const user = useContext(UserContext);
  return (
    <Container>
      <Tabs.Root defaultValue="add">
        <Tabs.List>
          <Tabs.Trigger value="add">Add</Tabs.Trigger>
          <Tabs.Trigger value="edit">Edit</Tabs.Trigger>
          <Tabs.Trigger value="price">Price</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="add">
            <AddItemField />
          </Tabs.Content>

          <Tabs.Content value="edit">
            <Text size="2">Access and update your edit.</Text>
          </Tabs.Content>

          <Tabs.Content value="price">
            <Text size="2">
              Edit your profile or update contact information.
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Container>
  );
};

export default Dashboard;
