import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Item } from "../../../interfaces";
import DeleteItemButton from "./DeleteItemButton";
import SelectCategory from "./SelectCategory";
import Spinner from "../../../components/Spinner";
import "./disableDefaultForm.css";

interface Props {
  application: "add" | "update";
  onFormSubmit: (
    data: Data,
    onSuccess: (data: Data) => void,
    onFail: (error: AxiosError) => void
  ) => void;
  isLoading?: boolean;
  initialData?: Item;
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
}: Props) => {
  const { register, handleSubmit, control, resetField, formState, setValue } =
    useForm<Data>();
  const [showSelector, setShowSelector] = useState(false);
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("price", initialData.price);
      setValue("description", initialData.description);
      setValue("category", initialData.category);
      setShowSelector(true);
    }
  }, [initialData]);
  const onSuccess = (data: Data) => {
    resetField("name");
    resetField("price");
    resetField("description");
    toast.success(`${data.name} has been added to the menu successfully.`);
  };
  const onFail = (error: AxiosError) => {
    toast.error(`Something unexpected happened. Please try again later.`);
    console.log(error);
  };

  return (
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
          {(application === "add" || showSelector) && (
            <SelectCategory
              control={control}
              genericOption="No Category"
              changeCategory={(category: string) => {
                if (category) setValue("category", category);
              }}
            />
          )}
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
            {initialData && (
              <DeleteItemButton
                itemId={initialData.id}
                itemCategory={initialData.category}
              />
            )}
          </>
        )}
      </Flex>
    </form>
  );
};

export default ItemForm;
