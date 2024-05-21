import { Button, Checkbox, Dialog, Flex, Text } from "@radix-ui/themes";
import React from "react";
import useItems from "../hooks/useItems";
import useItemsInGroups from "../hooks/useItemsInGroups";

const ItemsPicker = () => {
  const { data: items } = useItems();
  const { itemGroups } = useItemsInGroups(items);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Pick Items</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="600px">
        <Dialog.Title>Item Picker</Dialog.Title>

        {itemGroups?.map((group) => (
          <Flex direction="column" key={group[0].category}>
            <Flex align="center" gap="2" className="border-b-2" my="3">
              <Checkbox size="3" />
              <Text weight="bold">{group[0].category || "No Category"}</Text>
            </Flex>
            {group.map((item) => (
              <div className="grid grid-cols-5">
                <div className="col-span-3">
                  <Flex key={item.id} mx="4" my="2" align="center" gap="2">
                    <Checkbox />
                    <Text mx="2">{item.name}</Text>
                  </Flex>
                </div>
                <div className="col-span-1">{item.price}</div>
                <div className="col-span-1"></div>
              </div>
            ))}
          </Flex>
        ))}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ItemsPicker;
