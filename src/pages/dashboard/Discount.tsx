import React from "react";
import Selector, { SelectData } from "../../components/Selector";
import { Flex, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import ItemsPicker from "../../components/ItemsPicker";

const percents: SelectData[] = [
  { value: "5", label: "5 Percent" },
  { value: "10", label: "10 Percent" },
  { value: "15", label: "15 Percent" },
  { value: "20", label: "20 Percent" },
  { value: "25", label: "25 Percent" },
  { value: "30", label: "30 Percent" },
  { value: "50", label: "50 Percent" },
];
const dueDate: SelectData[] = [
  { value: "1", label: "1 Day" },
  { value: "2", label: "2 Days" },
  { value: "3", label: "3 Days" },
  { value: "7", label: "1 Week" },
  { value: "14", label: "2 Weeks" },
  { value: "30", label: "1 Month" },
  { value: "60", label: "2 Months" },
  { value: "90", label: "3 Months" },
  { value: "365", label: "1 Year" },
  { value: "0", label: "--Remove Discount--" },
];

const Discount = () => {
  const { register, control, handleSubmit } = useForm();
  return (
    <div className="grid grid-cols-6 gap-y-8 gap-x-2">
      <div className="col-span-1 max-md:col-span-2">
        <Text>Percent:</Text>
      </div>
      <div className="col-span-4 max-md:col-span-3">
        <Selector control={control} name="percent" options={percents} />
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1 max-md:col-span-2">
        <Text>Until:</Text>
      </div>
      <div className="col-span-4 max-md:col-span-3">
        <Selector control={control} name="dueDate" options={dueDate} />
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1 max-md:col-span-2">
        <Text>Items:</Text>
      </div>
      <div className="col-span-4 max-md:col-span-3">
        <ItemsPicker />
      </div>
    </div>
  );
};

export default Discount;
