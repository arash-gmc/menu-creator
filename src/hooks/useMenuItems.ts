import { useQuery } from "@tanstack/react-query";
import { Item, Restaurant } from "../interfaces";
import ApiClient from "../services/apiClient";
import { useEffect } from "react";

const useMenuItems = (restaurantName: string, entrance: string | null) => {
  const apiClient = new ApiClient();

  const { data: restaurant, error } = useQuery<Restaurant>({
    queryKey: [restaurantName],
    queryFn: () => apiClient.getRestaurant(restaurantName),
  });

  const { data: items } = useQuery<Item[]>({
    queryKey: [restaurantName, "items"],
    queryFn: async () => await apiClient.getItems(restaurantName),
  });

  useEffect(() => {
    if (restaurant && entrance !== "admin")
      apiClient.addView(restaurant.id, entrance);
  }, [restaurant]);

  return { restaurant, items, error };
};

export default useMenuItems;
