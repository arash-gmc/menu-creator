import { Button, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/Spinner";
import { Item, ItemFormData } from "../../../interfaces";
import DeleteItemButton from "./DeleteItemButton";
import ItemPhoto from "./ItemPhoto";
import SelectCategory from "./SelectCategory";

interface Props {
  application: "add" | "update";
  onFormSubmit: (data: ItemFormData) => void;
  isLoading?: boolean;
  initialData?: Item;
}

const ItemForm = ({
  onFormSubmit,
  isLoading,
  initialData,
  application,
}: Props) => {
  const [showSelector, setShowSelector] = useState(false);
  const [photoPublicId, setPhotoPublicId] = useState<string>();
  const { register, handleSubmit, control, resetField, formState, setValue } =
    useForm<ItemFormData>();
  const { t: tr } = useTranslation();
  const t = tr("dashboard.itemForm") as any;
  useEffect(() => {
    setInitialData();
  }, [initialData]);

  const resetFields = () => {
    resetField("name");
    resetField("price");
    resetField("description");
    setPhotoPublicId(undefined);
  };

  const setInitialData = () => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("price", initialData.price);
      setValue("description", initialData.description);
      setValue("category", initialData.category);
      setShowSelector(true);
      setPhotoPublicId(initialData?.photoPublicId);
    }
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onFormSubmit({ ...data, photoPublicId: photoPublicId });
        if (application === "add") resetFields();
      })}
    >
      <div className="grid grid-cols-6 gap-3">
        <Flex direction="column" className="col-span-3 max-md:col-span-4">
          <TextField.Root
            {...register("name", { required: true })}
            placeholder={t.name}
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
            placeholder={t.price}
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
              changeCategory={(category: string) => {
                if (category) setValue("category", category);
              }}
            />
          )}
        </div>

        <TextField.Root
          {...register("description")}
          className="col-span-6"
          placeholder={t.description}
        />
      </div>
      <Grid
        p="2"
        my="5"
        gap="5"
        align="center"
        columns={{ initial: "1", sm: "2" }}
      >
        <ItemPhoto
          photoPublicId={photoPublicId}
          setPhotoPublicId={(publicId) => setPhotoPublicId(publicId)}
        />
        <Flex
          justify="center"
          mt="4"
          gap="5"
          direction="column"
          className={"max-w-sm mx-auto max-md:order-2"}
        >
          <Button size="3" type="submit" disabled={isLoading}>
            {application === "add"
              ? t.addItem
              : application === "update"
              ? t.updateItem
              : ""}
            {isLoading && <Spinner />}
          </Button>
          {initialData && (
            <DeleteItemButton
              itemId={initialData.id}
              itemCategory={initialData.category}
            />
          )}
        </Flex>
      </Grid>
    </form>
  );
};

export default ItemForm;
