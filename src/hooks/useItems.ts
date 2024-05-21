import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../Providers";
import { Item } from "../interfaces";
import axios from "axios";

const useItems = () => {
  const user = useContext(UserContext);
  const query = useQuery<Item[]>({
    queryKey: ["items", user?.name],
    queryFn: () =>
      axios.get("/api/items/get/" + user?.name).then((res) => res.data),
  });
  return query;
};

export default useItems;
