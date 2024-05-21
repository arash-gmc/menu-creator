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

export interface SelectData {
  value: string;
  label: string;
}

interface Props {
  control: Control<FieldValues, any>;
  options: SelectData[];
  placeholder?: string;
  name: string;
}

const Selector = ({ control, options, placeholder, name }: Props) => {
  return (
    <div className="w-full">
      <Flex direction="column">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select.Root onValueChange={field.onChange}>
              <Select.Trigger placeholder={placeholder || "Select One"} />
              <Select.Content>
                {options.map((option) => (
                  <Select.Item value={option.value} key={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
      </Flex>
    </div>
  );
};

export default Selector;
