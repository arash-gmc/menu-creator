import { Button, Flex, TextField } from "@radix-ui/themes";
import SelectComponent from "./SelectComponent";
import defaultCategories from "../data/defaultCategories";
import "./ItemForm.css";
import { UseFormReset, useForm } from "react-hook-form";
import CalloutComponent from "./CalloutComponent";
import { useState } from "react";

interface Props {
  onFormSubmit: (data: Data, onSuccess: () => void) => void;
}

export interface Data {
  name: string;
  price: number;
  category: string;
  description: string;
}

const ItemForm = ({ onFormSubmit }: Props) => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState<"green" | "red" | undefined>();
  const { register, handleSubmit, control, resetField } = useForm<Data>();
  const onSuccess = () => {
    resetField("name");
    resetField("price");
    resetField("description");
    setMessage("Your item has been added to the menu successfully.");
    setColor("green");
  };
  const resetFields = () => {};
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit((data) => {
          onFormSubmit(data, onSuccess);
        })}
      >
        <div className="grid grid-cols-6 gap-4">
          <TextField.Root
            {...register("name")}
            placeholder="Name"
            className="col-span-3"
          />
          <TextField.Root
            type="number"
            placeholder="Price"
            className="col-span-1"
            {...register("price")}
          />

          <div className="col-span-2">
            <SelectComponent items={defaultCategories} control={control} />
          </div>

          <TextField.Root
            {...register("description")}
            className="col-span-6"
            placeholder="description"
          />
        </div>
        <Flex justify="center" mt="4">
          <Button size="3" type="submit">
            Add Item
          </Button>
        </Flex>
      </form>
      <div className="absolute -bottom-28 w-full">
        <Flex direction="column">
          <CalloutComponent message={message} color={color} />
        </Flex>
      </div>
    </div>
  );
};

export default ItemForm;
