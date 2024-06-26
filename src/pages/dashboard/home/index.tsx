import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Providers";
import EmbededMenu from "./EmbededMenu";
import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "../../../components/QRCode";
import CldImage from "../../../components/CldImage";
import axios from "axios";
import { Restaurant } from "../../../interfaces";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Home = () => {
  const user = useContext(UserContext);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const { t: tr } = useTranslation();
  const t = tr("dashboard.home") as any;
  const navigate = useNavigate();
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
  if (!restaurant) return null;
  const url = import.meta.env.VITE_FRONTEND_URL + "/m/" + restaurant.username;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="px-2 pt-6 pb-2 border-2 border-dashed rounded-2xl border-stone-300 relative  mb-6 ">
        <Heading size="3" className="absolute bg-white -top-5 p-2 rounded-2xl">
          {t.basicInfo}
        </Heading>
        <Grid columns="40% 60%" className="md:px-10" gap="5" align="center">
          <Text>{t.title}</Text>
          <Text weight="bold" align="center">
            {restaurant.title}
          </Text>
          <Text>{t.username}</Text>
          <Text weight="bold" align="center">
            {restaurant.username}
          </Text>
          {restaurant.logoPublicId && (
            <>
              <Text>{t.logo}</Text>
              <div className="mx-auto border-4 rounded-full">
                <CldImage publicId={restaurant.logoPublicId} size={100} />
              </div>
            </>
          )}
          {restaurant.instagramId && (
            <>
              <Text>{t.instagram}</Text>
              <Text weight="bold" align="center">
                <a
                  target="_blank"
                  href={"https://instagram.com/" + restaurant.instagramId}
                >
                  {restaurant.instagramId}
                </a>
              </Text>
            </>
          )}
          {restaurant.phoneNumber && (
            <>
              <Text>{t.phone}</Text>
              <Text weight="bold" align="center">
                {restaurant.phoneNumber}
              </Text>
            </>
          )}
        </Grid>
        <Flex justify="center" my="5">
          <Button onClick={() => navigate("/dashboard/edit-user")}>
            {t.editBtn}
          </Button>
        </Flex>
      </div>
      <Flex
        gap="3"
        align="center"
        justify="center"
        className="px-4 md:px-10"
        direction={{ initial: "column", sm: "row" }}
      >
        <Heading size="5" className="text-nowrap">
          {t.menuURL}
        </Heading>
        <Flex className="rounded-xl px-2" align="center">
          <Box className="bg-amber-200 p-2 m-1 rounded-md border-2 border-dashed border-slate-500 select-text">
            {url}
          </Box>
          <Button
            color="cyan"
            onClick={() => navigator.clipboard.writeText(url)}
            size="3"
          >
            {tr("common.copy")}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
