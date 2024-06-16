import { Button, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import { Item } from "../../../interfaces";
import { useTranslation } from "react-i18next";
import SelectCategory from "./SelectCategory";
import DeleteItemButton from "./DeleteItemButton";
import ItemPhoto from "./ItemPhoto";

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
  photoPublicId?: string;
}

const ItemForm = ({
  application,
  onFormSubmit,
  isLoading = false,
  initialData,
}: Props) => {
  const { register, handleSubmit, control, resetField, formState, setValue } =
    useForm<Data>();
  const { t } = useTranslation("dashboard");
  const [showSelector, setShowSelector] = useState(false);
  const [photoPublicId, setPhotoPublicId] = useState<string | undefined>(
    initialData?.photoPublicId
  );

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("price", initialData.price);
      setValue("description", initialData.description);
      setValue("category", initialData.category);
      setShowSelector(true);
    }
  }, [initialData, setValue]);

  const handleSuccess = (data: Data) => {
    resetField("name");
    resetField("price");
    resetField("description");
    setPhotoPublicId(undefined);
    toast.success(t("messages.addItem", { name: data.name }));
  };

  const handleFailure = (error: AxiosError) => {
    toast.error(t("messages.generalError"));
    console.error(error);
  };

  const onSubmit = (data: Data) => {
    onFormSubmit(data, handleSuccess, handleFailure);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns={{ initial: "6", sm: "8" }} gap="4" p="4">
        <TextField.Root
          className="col-span-6"
          placeholder={t("itemForm.name")}
          {...register("name", { required: true })}
        />
        {formState.errors.name && (
          <Text color="red">{t("itemForm.required")}</Text>
        )}

        <TextField.Root
          className="col-span-6"
          placeholder={t("itemForm.price")}
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {formState.errors.price && (
          <Text color="red">
            {formState.errors.price.type === "required" &&
              t("itemForm.required")}
            {formState.errors.price.type === "valueAsNumber" &&
              t("itemForm.validNumber")}
          </Text>
        )}

        <div className="col-span-2 max-md:col-span-6">
          {(application === "add" || showSelector) && (
            <SelectCategory
              control={control}
              changeCategory={(category: string) =>
                setValue("category", category)
              }
            />
          )}
        </div>

        <TextField.Root
          className="col-span-6"
          placeholder={t("itemForm.description")}
          {...register("description")}
        />
      </Grid>

      <Grid
        p="2"
        my="5"
        gap="5"
        align="center"
        columns={{ initial: "1", sm: "2" }}
      >
        <Flex
          justify="center"
          mt="4"
          gap="5"
          direction="column"
          className="max-w-sm mx-auto max-md:order-2"
        >
          <Button
            size={{ initial: "2", md: "3" }}
            type="submit"
            disabled={isLoading}
          >
            {application === "add"
              ? t("itemForm.addItem")
              : t("itemForm.updateItem")}
            {isLoading && <Spinner />}
          </Button>

          {application === "update" && initialData && (
            <DeleteItemButton
              itemId={initialData.id}
              itemCategory={initialData.category}
            />
          )}
        </Flex>

        <ItemPhoto
          photoPublicId={photoPublicId}
          setPhotoPublicId={setPhotoPublicId}
        />
      </Grid>
    </form>
  );
};

export default ItemForm;
