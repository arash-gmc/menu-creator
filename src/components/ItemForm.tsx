import { Button, Flex, TextField, Text } from "@radix-ui/themes";
import SelectCategory from "./SelectCategory";
import "./disableDefaultForm.css";
import { UseFormReset, useForm } from "react-hook-form";
import CalloutComponent from "./CalloutComponent";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Spinner from "./Spinner";
import { Item } from "../interfaces";
import DeleteItemButton from "./DeleteItemButton";

interface Props {
  application: "add" | "update";
  onFormSubmit: (
    data: Data,
    onSuccess: (data: Data) => void,
    onFail: (error: AxiosError) => void
  ) => void;
  isLoading?: boolean;
  initialData?: Item;
  reset?: () => void;
}

export interface Data {
  name: string;
  price: number;
  category: string;
  description: string;
}

const ItemForm = ({
  onFormSubmit,
  isLoading,
  initialData,
  application,
  reset,
}: Props) => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState<"green" | "red" | undefined>();
  const { register, handleSubmit, control, resetField, formState, setValue } =
    useForm<Data>();
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("price", initialData.price);
      setValue("description", initialData.description);
      setValue("category", initialData.category);
    }
  }, [initialData]);
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
        <div className="grid grid-cols-6 gap-3">
          <Flex direction="column" className="col-span-3 max-md:col-span-4">
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
          <Flex direction="column" className="col-span-1 max-md:col-span-2">
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
          <div className="col-span-2 max-md:col-span-6">
            <SelectCategory
              control={control}
              genericOption="No Category"
              changeCategory={(category: string) => {
                if (category) setValue("category", category);
              }}
            />
          </div>

          <TextField.Root
            {...register("description")}
            className="col-span-6"
            placeholder="Description"
          />
        </div>
        <Flex justify="center" mt="4" gap="5">
          {application === "add" && (
            <Button size="3" type="submit" disabled={isLoading}>
              Add Item
              {isLoading && <Spinner />}
            </Button>
          )}
          {application === "update" && (
            <>
              <Button size="3" type="submit" disabled={isLoading}>
                Update Item
                {isLoading && <Spinner />}
              </Button>
              <DeleteItemButton
                itemId={initialData!.id}
                onSuccess={() => {
                  setMessage("Your item has been deleted successfully.");
                  setColor("green");
                  if (reset) reset();
                }}
              />
            </>
          )}
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
