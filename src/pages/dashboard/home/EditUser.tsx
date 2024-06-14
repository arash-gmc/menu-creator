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

interface FormData {
  username: string;
  title: string;
  instagramId: string;
  phoneNumber: string;
}

const fields: { value: keyof FormData; label: string }[] = [
  { value: "username", label: "Username" },
  { value: "title", label: "Title" },
  { value: "instagramId", label: "Instagram ID" },
  { value: "phoneNumber", label: "Phone Number" },
];

const EditUser = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [application, setApplication] = useState<string>();
  const [publicId, setPublicId] = useState<string>();
  const user = useContext(UserContext);
  useEffect(() => {
    if (!user) return;
    axios
      .get<Restaurant>("/api/restaurants/get/" + user.name)
      .then((res) => setRestaurant(res.data))
      .catch((e) => {
        toast("There was a problem with fetchin data");
        console.log(e);
      });
  }, [user]);
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
    axios
      .put("/api/restaurants/edit", sendingObj)
      .then((res) => {
        toast.success("Your Changes has applied successfully");
        navigate("/dashboard");
      })
      .catch((e) => {
        toast.error("There was a problem with editing restaurant.");
      });
  };

  return (
    <div>
      <Heading my="5">Edit Restaurant Info</Heading>
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
          <Text>Application</Text>
          {restaurant && (
            <Select.Root
              defaultValue={restaurant.type}
              onValueChange={(e) => setApplication(e.valueOf())}
            >
              <Select.Trigger placeholder="Application" />
              <Select.Content>
                {restaurantTypes.map((type) => (
                  <Select.Item value={type} key={type}>
                    {type}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
          <Text>Logo</Text>

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
                  Delete
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
            Cancel
          </Button>
          <Button size="3">Apply</Button>
        </Flex>
      </form>
    </div>
  );
};

export default EditUser;
