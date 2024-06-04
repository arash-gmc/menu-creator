import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import UploadWidget from "../../../components/UploadWidget";
import { Item } from "../../../interfaces";
import DeleteItemButton from "./DeleteItemButton";
import SelectCategory from "./SelectCategory";
import "./disableDefaultForm.css";
import { useTranslation } from "react-i18next";

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
  onFormSubmit,
  isLoading,
  initialData,
  application,
}: Props) => {
  const { register, handleSubmit, control, resetField, formState, setValue } =
    useForm<Data>();
  const [showSelector, setShowSelector] = useState(false);
  const [photoPublictId, setPhotoPublicId] = useState<string>();
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("price", initialData.price);
      setValue("description", initialData.description);
      setValue("category", initialData.category);
      setShowSelector(true);
      setPhotoPublicId(initialData?.photoPublicId);
    }
  }, [initialData]);
  const onSuccess = (data: Data) => {
    resetField("name");
    resetField("price");
    resetField("description");
    setPhotoPublicId(undefined);
    toast.success(`${data.name} has been added to the menu successfully.`);
  };
  const onFail = (error: AxiosError) => {
    toast.error(`Something unexpected happened. Please try again later.`);
    console.log(error);
  };
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });

  const itemPhoto = cld.image(photoPublictId);
  itemPhoto.resize(fill().width(100).height(100)).roundCorners(byRadius(30));
  const { t: tr } = useTranslation();
  const t = tr("dashboard.itemForm") as any;
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onFormSubmit(
          { ...data, photoPublicId: photoPublictId },
          onSuccess,
          onFail
        );
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
        <Flex gap="3" px="2" align="center">
          <Text wrap="nowrap">{t.itemPhoto}</Text>

          {photoPublictId && <AdvancedImage cldImg={itemPhoto} />}
          <UploadWidget
            onUploadDone={(publicId) => setPhotoPublicId(publicId)}
            folder="items"
          />
        </Flex>
      </div>
      <Flex justify="center" mt="4" gap="5">
        {application === "add" && (
          <Button
            size={{ initial: "2", md: "3" }}
            type="submit"
            disabled={isLoading}
          >
            {t.addItem}
            {isLoading && <Spinner />}
          </Button>
        )}
        {application === "update" && (
          <>
            <Button size="3" type="submit" disabled={isLoading}>
              {t.updateItem}
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
