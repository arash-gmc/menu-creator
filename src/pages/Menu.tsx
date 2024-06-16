import { useParams, useSearchParams } from "react-router-dom";
import useMenuItems from "../hooks/useMenuItems";
import PlainDark from "../themes/PlainDark";
import PlainLight from "../themes/PlainLight";
import { Item, Restaurant } from "../interfaces";
import { ReactNode } from "react";

interface ThemeProp {
  restaurant: Restaurant | undefined;
  items: Item[] | undefined;
}

const Menu = () => {
  const { restaurantName } = useParams();
  if (!restaurantName) return null;
  const entrance = useSearchParams()[0].get("i");
  const { items, restaurant, error } = useMenuItems(restaurantName, entrance);

  const props: ThemeProp = { restaurant, items };
  const theme = restaurant?.theme;

  const themeMap: Record<string, ReactNode> = {
    "plain-dark": <PlainDark {...props} />,
    "plain-light": <PlainDark {...props} />,
  };

  if (theme && themeMap[theme]) return themeMap[theme];
  return <PlainLight {...props} />;
};

export default Menu;
