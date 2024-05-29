import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Item, Restaurant } from "../interfaces";
import { Container, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import PlainDark from "../themes/PlainDark";
import PlainLight from "../themes/PlainLight";

const Menu = () => {
  const { restaurantName } = useParams();
  const { data: items } = useQuery<Item[]>({
    queryKey: [restaurantName, "items"],
    queryFn: () =>
      axios.get("/api/items/get/" + restaurantName).then((res) => res.data),
  });

  const { data: restaurant } = useQuery<Restaurant>({
    queryKey: [restaurantName],
    queryFn: () =>
      axios
        .get("/api/restaurants/get/" + restaurantName)
        .then((res) => res.data),
  });
  const [searchParams] = useSearchParams();
  const interance = searchParams.get("i");
  useEffect(() => {
    if (restaurant)
      axios
        .post("/api/restaurants/add-view", {
          restaurantId: restaurant?.id,
          interance,
        })
        .then((r) => console.log("successfull"))
        .catch((e) =>
          console.log("There is a problem with add view record.", e)
        );
  }, [restaurant]);
  if (restaurant?.theme === "plain-dark")
    return <PlainDark restaurant={restaurant} items={items} />;
  if (restaurant?.theme === "plain-light")
    return <PlainLight restaurant={restaurant} items={items} />;

  return <PlainLight restaurant={restaurant} items={items} />;
};

export default Menu;
