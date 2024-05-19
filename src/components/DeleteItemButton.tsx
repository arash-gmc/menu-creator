import { Button } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { Item } from "../interfaces";
import { UserContext } from "../Providers";

interface Props {
  itemId?: string;
  onSuccess: () => void;
}

const DeleteItemButton = ({ itemId, onSuccess }: Props) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const queryClient = useQueryClient();
  const deleteItem = () => {
    axios.delete("/api/items/delete/" + itemId).then((res) => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["items", user?.name] });
      // setTimeout(() => navigate("/dashboard"), 2000);
      // setTimeout(() => {
      //   navigate("edit");
      // }, 2500);
    });
  };
  return (
    <Button size="3" type="button" color="red" onClick={() => deleteItem()}>
      Delete Item
    </Button>
  );
};

export default DeleteItemButton;
