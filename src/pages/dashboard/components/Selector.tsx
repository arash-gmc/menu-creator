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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../Discount";

export interface SelectData {
  value: string;
  label: string;
}

interface Props {
  control: Control<Data, any>;
  options: SelectData[];
  placeholder?: string;
  name: "percent" | "dueDays";
  disabled?: boolean;
}

const Selector = ({ control, options, placeholder, name, disabled }: Props) => {
  return (
    <div className="w-full">
      <Flex direction="column">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select.Root onValueChange={field.onChange} disabled={disabled}>
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
