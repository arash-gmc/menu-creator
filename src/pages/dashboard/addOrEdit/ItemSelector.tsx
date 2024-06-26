import React, { useEffect, useState } from "react";
import { Item } from "../../../interfaces";
import { Button, Flex, Select } from "@radix-ui/themes";
import useItemsInGroups from "../../../hooks/useItemsInGroups";
import useMyStore from "../../../store";
import { useTranslation } from "react-i18next";

interface Props {
  items: Item[] | undefined;
}

const ItemSelector = ({ items }: Props) => {
  const { itemGroups } = useItemsInGroups(items);
  const { setEditingItemId, editingItemId } = useMyStore();
  if (!itemGroups) return null;
  const { t, i18n } = useTranslation();
  return (
    <Select.Root
      onValueChange={(e) => setEditingItemId(e.valueOf())}
      defaultValue={editingItemId}
      dir={i18n.dir()}
    >
      <Select.Trigger placeholder={t("dashboard.itemForm.chooseItem")} />
      <Select.Content>
        {itemGroups.map((group) => (
          <Select.Group key={"g-" + group[0].id}>
            <Select.Separator />
            <Select.Label>
              {group[0].category ? group[0].category : "No Category"}
            </Select.Label>
            <Select.Separator />
            {group.map((item) => (
              <Select.Item value={item.id} key={item.id} dir={i18n.dir()}>
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
