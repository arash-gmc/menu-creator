import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const Menu = () => {
  const { restaurantName } = useParams();
  const { data } = useQuery({
    queryKey: [restaurantName, "items"],
    queryFn: () =>
      axios
        .get("http://localhost:5000/api/items/get/" + restaurantName)
        .then((res) => res.data),
  });
  console.log(data);
  return <div>{restaurantName}</div>;
};

export default Menu;
