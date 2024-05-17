import { Button, Flex, TextField, Text } from "@radix-ui/themes";
import SelectComponent from "./SelectComponent";
import defaultCategories from "../data/defaultCategories";
import "./ItemForm.css";
import { UseFormReset, useForm } from "react-hook-form";
import CalloutComponent from "./CalloutComponent";
import { useState } from "react";
import { AxiosError } from "axios";
import Spinner from "./Spinner";

interface Props {
  onFormSubmit: (
    data: Data,
    onSuccess: (data: Data) => void,
    onFail: (error: AxiosError) => void
  ) => void;
  isLoading?: boolean;
}

export interface Data {
  name: string;
  price: number;
  category: string;
  description: string;
}

const ItemForm = ({ onFormSubmit, isLoading }: Props) => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState<"green" | "red" | undefined>();
  const { register, handleSubmit, control, resetField, formState } =
    useForm<Data>();
  const onSuccess = (data: Data) => {
    resetField("name");
    resetField("price");
    resetField("description");
    setMessage(`${data.name} has been added to the menu successfully.`);
    setColor("green");
  };
  const onFail = (error: AxiosError) => {
    setMessage(`Something unexpected happened. Please try again later.`);
    setColor("red");
  };
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit((data) => {
          onFormSubmit(data, onSuccess, onFail);
        })}
      >
        <div className="grid grid-cols-6 gap-4">
          <Flex direction="column" className="col-span-3">
            <TextField.Root
              {...register("name", { required: true })}
              placeholder="Name"
              className="text-center"
            />
            {formState.errors.name && (
              <Text size="1" mx="1" color="red">
                *required
              </Text>
            )}
          </Flex>
          <Flex direction="column" className="col-span-1">
            <TextField.Root
              type="number"
              min={0}
              placeholder="Price"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {formState.errors.price && (
              <Text size="1" mx="1" color="red">
                {formState.errors.price.type === "required" ? "*required" : ""}
                {formState.errors.price.type === "valueAsNumber"
                  ? "*enter a valid number"
                  : ""}
              </Text>
            )}
          </Flex>
          <div className="col-span-2">
            <SelectComponent
              items={defaultCategories}
              control={control}
              defaultOption="No Category"
            />
          </div>

          <TextField.Root
            {...register("description")}
            className="col-span-6"
            placeholder="Description"
          />
        </div>
        <Flex justify="center" mt="4">
          <Button size="3" type="submit" disabled={isLoading}>
            Add Item {isLoading && <Spinner />}
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
