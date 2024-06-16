import axios from "axios";
import { Item, Restaurant } from "../interfaces";
import showError from "./showError";
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
    });

  editItem = (updateObj: any) =>
    AxiosInstance.put("/items/edit-one", updateObj);
  deleteItem = (itemId: string) =>
    AxiosInstance.delete("/items/delete/" + itemId);
  changePrice = (obj: any) => AxiosInstance.put("/items/change-prices", obj);
  setDiscount = (
    percent: number,
    dueDays: number,
    itemIds: string[] | undefined
  ) =>
    AxiosInstance.put("/items/set-discount", {
      percent,
      dueDays,
      itemIds,
    });

  removeAllDiscounts = () => AxiosInstance.put("/items/remove-discounts");
  //restaurant
  getRestaurant = (restaurantUsername: string | undefined) =>
    AxiosInstance.get<Restaurant>(
      "/restaurants/get/" + restaurantUsername
    ).then((res) => res.data);

  editUser = (obj: any) => axios.put("/api/restaurants/edit", obj);

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
