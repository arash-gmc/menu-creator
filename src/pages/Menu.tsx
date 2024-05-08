import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Item } from "../interfaces";

const Menu = () => {
  const { restaurantName } = useParams();
  const { data: items } = useQuery<Item[]>({
    queryKey: [restaurantName, "items"],
    queryFn: () =>
      axios
        .get("http://localhost:5000/api/items/get/" + restaurantName)
        .then((res) => res.data),
  });
  return (
    <>
      <h1>{restaurantName}</h1>
      <ul>
        {items?.map((item) => (
          <li>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Menu;
