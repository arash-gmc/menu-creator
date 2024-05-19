import React, { useEffect, useState } from "react";
import { Item } from "../interfaces";
import { Select } from "@radix-ui/themes";

interface Props {
  items: Item[] | undefined;
  onSelect: (id: string) => void;
}

const ItemSelector = ({ items, onSelect }: Props) => {
  const [itemGroups, setItemGroups] = useState<Item[][]>();
  useEffect(() => {
    if (items) {
      const outer: Item[][] = [];
      let inner: Item[] = [];
      items.forEach((item, index) => {
        if (index === items.length - 1) return outer.push(inner);
        inner.push(item);
        if (item.category !== items[index + 1].category) {
          outer.push(inner);
          inner = [];
        }
      });
      setItemGroups(outer);
    }
  }, [!!items]);
  if (!itemGroups) return null;
  return (
    <Select.Root onValueChange={(e) => onSelect(e.valueOf())}>
      <Select.Trigger placeholder="Choose an Item" />
      <Select.Content>
        {itemGroups.map((group) => (
          <Select.Group key={"g-" + group[0].id}>
            <Select.Separator />
            <Select.Label>
              {group[0].category ? group[0].category : "No Category"}
            </Select.Label>
            <Select.Separator />
            {group.map((item) => (
              <Select.Item value={item.id} key={item.id}>
                {item.name}
              </Select.Item>
            ))}
          </Select.Group>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ItemSelector;
