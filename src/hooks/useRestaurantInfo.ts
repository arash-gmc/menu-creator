import { useQuery } from "@tanstack/react-query";
import { Item, Restaurant } from "../interfaces";
import ApiClient from "../services/apiClient";
import { useEffect } from "react";

const useRestaurantInfo = (restaurantName: string | undefined) => {
  const apiClient = new ApiClient();
  const { data: restaurant, error } = useQuery<Restaurant>({
    queryKey: [restaurantName],
    queryFn: () => apiClient.getRestaurant(restaurantName),
  });

  return { restaurant, error };
};

export default useRestaurantInfo;
