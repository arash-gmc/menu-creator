import { fill } from "@cloudinary/url-gen/actions/resize";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Providers";
import UploadWidget from "../../../components/UploadWidget";
import { Restaurant, restaurantTypes } from "../../../interfaces";
import CldImage from "../../../components/CldImage";
import useMenuItems from "../../../hooks/useMenuItems";
import ApiClient from "../../../services/apiClient";
import showError from "../../../services/showError";
import useRestaurantInfo from "../../../hooks/useRestaurantInfo";
import { useTranslation } from "react-i18next";
import i18next from "../../../i18next";

interface FormData {
  username: string;
  title: string;
  instagramId: string;
  phoneNumber: string;
}

const t = i18next.t("dashboard.home") as any;
const tr = i18next.t;

const fields: { value: keyof FormData; label: string }[] = [
  { value: "username", label: t.username },
  { value: "title", label: t.title },
  { value: "instagramId", label: t.instagram },
  { value: "phoneNumber", label: t.phone },
];

const EditUser = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const apiClient = new ApiClient();
  const navigate = useNavigate();
  const [application, setApplication] = useState<string>();
  const [publicId, setPublicId] = useState<string>();
  const user = useContext(UserContext);
  const { restaurant } = useRestaurantInfo(user?.name);

  useEffect(() => {
    if (restaurant) {
      setValue("username", restaurant.username);
      setValue("title", restaurant.title);
      setValue("instagramId", restaurant.instagramId);
      setValue("phoneNumber", restaurant.phoneNumber);
      setApplication(restaurant.type);
      setPublicId(restaurant.logoPublicId);
    }
  }, [restaurant]);

  const onSubmit = (data: FormData) => {
    const sendingObj = { ...data, logoPublicId: publicId, type: application };
    apiClient
      .editUser(sendingObj)
      .then((res) => {
        toast.success("Your Changes has applied successfully");
        navigate("/dashboard");
      })
      .catch((e) => {
        showError();
      });
  };

  return (
    <div>
      <Heading my="5">{t.editTitle}</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        <Grid columns="40% 60%" gap="3" align="center">
          {fields.map((field) => (
            <React.Fragment key={field.value}>
              <Text>{field.label}</Text>
              <TextField.Root
                {...register(field.value)}
                placeholder={field.label}
              />
            </React.Fragment>
          ))}
          <Text>{t.application}</Text>
          {restaurant && (
            <Select.Root
              defaultValue={restaurant.type}
              onValueChange={(e) => setApplication(e.valueOf())}
            >
              <Select.Trigger placeholder={t.application} dir={i18next.dir()} />
              <Select.Content>
                {restaurantTypes.map((type) => (
                  <Select.Item value={type} key={type}>
                    {tr("applications." + type)}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
          <Text>{t.logo}</Text>

          {publicId && (
            <Flex align="center" gap="3">
              <CldImage publicId={publicId} size={100} />
              <Flex direction="column" gap="3">
                <UploadWidget
                  folder="logos"
                  onUploadDone={(publicId) => setPublicId(publicId)}
                  size="1"
                />
                <Button
                  variant="outline"
                  color="red"
                  type="button"
                  size="1"
                  onClick={() => setPublicId(undefined)}
                >
                  {tr("common.delete")}
                </Button>
              </Flex>
            </Flex>
          )}
          {!publicId && (
            <Flex>
              <UploadWidget
                folder="logos"
                onUploadDone={(publicId) => setPublicId(publicId)}
              />
            </Flex>
          )}
        </Grid>
        <Flex justify="end" gap="3" my="5">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate("/dashboard")}
            size="3"
          >
            {tr("common.cancel")}
          </Button>
          <Button size="3">{tr("common.ok")}</Button>
        </Flex>
      </form>
    </div>
  );
};

export default EditUser;
