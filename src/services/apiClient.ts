import axios from "axios";
import { Item, Restaurant } from "../interfaces";
import toast from "react-hot-toast";
import showError from "./showError";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  headers: { "x-auth-token": localStorage.getItem("token") },
});

class ApiClient {
  //items
  getItems = (restaurantUsername: string) =>
    AxiosInstance.get<Item[]>("/items/get/" + restaurantUsername).then(
      (res) => res.data
    );

  getViews = () =>
    AxiosInstance.get("/restaurants/get-views")
      .then((res) => res.data)
      .catch((e) => showError());

  //restaurant
  getRestaurant = (restaurantUsername: string) =>
    AxiosInstance.get<Restaurant>(
      "/restaurants/get/" + restaurantUsername
    ).then((res) => res.data);

  addView = (restaurantId: string, interance: string | null) =>
    AxiosInstance.post("/restaurants/add-view/", {
      restaurantId,
      interance,
    })
      .then((res) => null)
      .catch((e) => console.log("there is a problem with add view record"));
}

export default ApiClient;
