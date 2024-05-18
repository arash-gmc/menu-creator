import {
  Box,
  Button,
  Flex,
  Popover,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Data } from "./ItemForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  control: Control<Data, any>;
  genericOption: string;
}

const SelectCategory = ({ control, genericOption }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | undefined>();
  const newCategoryRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    axios
      .get<string[]>("/api/items/get-categories")
      .then((res) => setCategories(res.data));
  }, []);

  const addCategory = () => {
    const newCategory = newCategoryRef.current?.value;
    if (!newCategory) return;
    if (categories.includes(newCategory)) return setSelectValue(newCategory);
    setCategories((prev) => [newCategory, ...prev]);
    setSelectValue(newCategory);
  };
  if (!categories) return null;
  return (
    <Flex justify="between">
      <div className="w-full">
        <Flex direction="column">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select.Root onValueChange={field.onChange} value={selectValue}>
                <Select.Trigger placeholder="Category" />
                <Select.Content>
                  <Select.Item value="-">{genericOption}</Select.Item>
                  <Select.Separator />
                  {categories.map((item) => (
                    <Select.Item value={item} key={item}>
                      {item}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </Flex>
      </div>

      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft" type="button" mx="2">
            New
          </Button>
        </Popover.Trigger>
        <Popover.Content width="200px">
          <Flex direction="column" gap="3" align="start">
            <Text size="2" color="gray">
              New category name:
            </Text>
            <TextField.Root ref={newCategoryRef} />
            <Popover.Close>
              <Button onClick={() => addCategory()}>OK</Button>
            </Popover.Close>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default SelectCategory;
