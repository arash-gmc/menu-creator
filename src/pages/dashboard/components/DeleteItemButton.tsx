import { Button } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { Item } from "../../../interfaces";
import { UserContext } from "../../../Providers";
import toast from "react-hot-toast";
import useMyStore from "../../../store";

interface Props {
  itemId: string;
  itemCategory: string | null;
}

const DeleteItemButton = ({ itemId, itemCategory }: Props) => {
  const user = useContext(UserContext);
  const queryClient = useQueryClient();
  const { setEditingItemId, removeItemGroup } = useMyStore();
  const deleteItem = () => {
    axios.delete("/api/items/delete/" + itemId).then((res) => {
      setEditingItemId(undefined);
      removeItemGroup(itemId, itemCategory);
      toast.success("Your Item has been deleted successfully.");
    });
  };
  return (
    <Button size="3" type="button" color="red" onClick={() => deleteItem()}>
      Delete Item
    </Button>
  );
};

export default DeleteItemButton;
