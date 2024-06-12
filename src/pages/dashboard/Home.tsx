import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Providers";
import EmbededMenu from "./components/EmbededMenu";
import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import QRCode from "../../components/QRCode";
import CldImage from "./components/CldImage";
import axios from "axios";
import { Restaurant } from "../../interfaces";
import toast from "react-hot-toast";

const Home = () => {
  const user = useContext(UserContext);
  const [restaurant, setRestaurant] = useState<Restaurant>();
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
          Basic Information
        </Heading>
        <Grid columns="40% 60%" className="md:px-10" gap="5" align="center">
          <Text>Restaurant Name</Text>
          <Text weight="bold" align="center">
            {restaurant.title}
          </Text>
          <Text>Username</Text>
          <Text weight="bold" align="center">
            {restaurant.username}
          </Text>
          <Text>Logo</Text>
          <div className="mx-auto border-4 rounded-full">
            <CldImage publicId="foodmon/logos/sample" size={100} />
          </div>
          {restaurant.instagramId && (
            <>
              <Text>Instagram</Text>
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
              <Text>Phone Number</Text>
              <Text weight="bold" align="center">
                {restaurant.phoneNumber}
              </Text>
            </>
          )}
        </Grid>
        <Flex justify="center" my="5">
          <Button>Edit User Informations</Button>
        </Flex>
      </div>
      <Grid
        gap="3"
        align="center"
        className="px-4 md:px-10"
        columns={{ initial: "1", sm: "40% 60%" }}
      >
        <Heading size="5" className="text-nowrap">
          Menu URL
        </Heading>
        <Flex className="rounded-xl px-2" align="center" justify="center">
          <Box className="bg-blue-300 p-2 m-1 rounded-md border-2 border-dashed border-slate-500">
            {url}
          </Box>
          <Button
            color="gray"
            onClick={() => navigator.clipboard.writeText(url)}
            size="3"
          >
            Copy
          </Button>
        </Flex>
      </Grid>
    </div>
  );
};

export default Home;
