import React from "react";
import { useParams } from "react-router-dom";

const Menu = () => {
  const { restaurantName } = useParams();
  return <div>{restaurantName}</div>;
};

export default Menu;
