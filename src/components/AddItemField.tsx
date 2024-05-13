import { Flex, Grid, Select, TextField } from "@radix-ui/themes";
import React from "react";

const AddItemField = () => {
  return (
    <div className="grid grid-cols-6 gap-4 mx-10">
      <TextField.Root placeholder="Name" className="col-span-3" />
      <TextField.Root placeholder="Price" className="col-span-1" />

      <div className="col-span-2">
        <Select.Root>
          <Select.Trigger value="category" />
          <Select.Content>
            <Select.Item value="kebab">kebab</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      <TextField.Root className="col-span-6" placeholder="description" />
    </div>
  );
};

export default AddItemField;
