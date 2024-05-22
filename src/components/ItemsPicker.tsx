import { Box, Button, Checkbox, Dialog, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import useItems from "../hooks/useItems";
import useItemsInGroups from "../hooks/useItemsInGroups";
import { Item } from "../interfaces";

interface ItemCheck extends Item {
  isChecked: boolean;
}

interface Props {
  passItems: (items: string[] | undefined) => void;
  discount: number;
  rerender: number;
}

const ItemsPicker = ({ discount, passItems, rerender }: Props) => {
  const { data: items, refetch } = useItems();
  const itemChecks = items?.map((item) => ({ ...item, isChecked: false }));
  const { itemGroups: fetchedItemGroups } = useItemsInGroups(itemChecks);
  const [itemGroups, setItemGroups] = useState<ItemCheck[][] | undefined>();
  useEffect(() => {
    setItemGroups(fetchedItemGroups);
  }, [fetchedItemGroups]);
  useEffect(() => {
    onSuccess();
  }, [rerender]);
  const newPrice = (oldPrice: number, percent: number) =>
    Math.floor(oldPrice * (1 - percent / 100));

  const onSuccess = () => {
    const uncheckedItemGroups = itemGroups?.map((g) =>
      g.map((i) => ({ ...i, isChecked: false }))
    );
    setItemGroups(uncheckedItemGroups);
    refetch();
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" disabled={!discount && discount !== 0}>
          Pick Items
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="600px">
        <Box
          p={{ initial: "1", md: "5" }}
          m={{ initial: "1", md: "5" }}
          className="shadow-xl"
        >
          {itemGroups?.map((group) => (
            <Flex direction="column" key={group[0].category}>
              <Flex
                align="center"
                justify="center"
                gap="2"
                className="border-b-2 pb-2"
                my="3"
              >
                <Text weight="bold">{group[0].category || "No Category"}</Text>
              </Flex>
              {group.map((item) => (
                <div className="grid grid-cols-5" key={item.id}>
                  <div className="col-span-3">
                    <Flex key={item.id} mx="4" my="2" align="center" gap="2">
                      <Checkbox
                        defaultChecked={item.isChecked}
                        onCheckedChange={(e) => {
                          setItemGroups((prev) =>
                            prev?.map((g) =>
                              g[0].id !== group[0].id
                                ? g
                                : g.map((i) =>
                                    i.id !== item.id
                                      ? i
                                      : { ...i, isChecked: !!e.valueOf() }
                                  )
                            )
                          );
                        }}
                      />
                      <Text mx="2">{item.name}</Text>
                    </Flex>
                  </div>
                  <div className="col-span-2">
                    <Text
                      className={
                        discount === 0 && item.isChecked
                          ? ""
                          : item.isChecked
                          ? "line-through text-red-600 font-normal"
                          : item.offPercent &&
                            new Date() < new Date(item.offDueDate)
                          ? "line-through text-gray-400 font-normal"
                          : ""
                      }
                    >
                      {item.price}
                    </Text>
                    <Text weight="bold" ml="6">
                      {discount === 0 && item.isChecked
                        ? ""
                        : item.isChecked
                        ? newPrice(item.price, discount)
                        : item.offPercent &&
                          new Date() < new Date(item.offDueDate)
                        ? newPrice(item.price, item.offPercent)
                        : ""}
                    </Text>
                    <Text size="1" ml="6">
                      {discount == 0 && item.isChecked
                        ? ""
                        : item.isChecked
                        ? `${discount}% off`
                        : item.offPercent &&
                          new Date() < new Date(item.offDueDate)
                        ? `${item.offPercent}% off`
                        : ""}
                    </Text>
                  </div>
                </div>
              ))}
            </Flex>
          ))}
          <Flex justify="center" m="5">
            <Dialog.Close>
              <Button
                size="3"
                variant="soft"
                onClick={() =>
                  passItems(
                    itemGroups
                      ?.reduce((acc, current) => acc.concat(current), [])
                      .filter((i) => i.isChecked)
                      .map((i) => i.id)
                  )
                }
              >
                Apply
              </Button>
            </Dialog.Close>
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ItemsPicker;
