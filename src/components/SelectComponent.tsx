import { Flex, Select } from "@radix-ui/themes";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Data } from "./ItemForm";

interface Props {
  items: string[];
  control: Control<Data, any>;
  defaultOption: string;
}

const SelectComponent = ({ items, control, defaultOption }: Props) => {
  return (
    <Flex direction="column">
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select.Root defaultValue="0" onValueChange={field.onChange}>
            <Select.Trigger />
            <Select.Content>
              {items.map((item) => (
                <Select.Item value={item} key={item}>
                  {item}
                </Select.Item>
              ))}
              <Select.Separator />
              <Select.Item value="0">{defaultOption}</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
      />
    </Flex>
  );
};

export default SelectComponent;
