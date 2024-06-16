import axios from "axios";
import { Item, Restaurant } from "../interfaces";
import toast from "react-hot-toast";
import showError from "./showError";
import showMessage from "./showMessage";
import { ItemFormData } from "../interfaces";

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

  addItem = (data: ItemFormData) =>
    AxiosInstance.post("/items/add-one", {
      ...data,
      category: data.category === "-" ? null : data.category,
    }).catch((error) => {
      showError();
    });

  editItem = (updateObj: any) =>
    axios.put("/api/items/edit-one", updateObj).catch((e) => showError());

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

  getViews = () =>
    AxiosInstance.get("/restaurants/get-views")
      .then((res) => res.data)
      .catch((e) => showError());
}

export default ApiClient;
