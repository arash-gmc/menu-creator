import { Button } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useMyStore from "../../../store";
import ApiClient from "../../../services/apiClient";
import showMessage from "../../../services/showMessage";
import showError from "../../../services/showError";

interface Props {
  itemId: string;
  itemCategory: string | null;
}

const DeleteItemButton = ({ itemId, itemCategory }: Props) => {
  const { setEditingItemId, removeItemGroup } = useMyStore();
  const { t } = useTranslation();
  const apiClient = new ApiClient();
  const deleteItem = () => {
    apiClient
      .deleteItem(itemId)
      .then((res) => {
        setEditingItemId(undefined);
        removeItemGroup(itemId, itemCategory);
        showMessage("itemDeletion");
      })
      .catch((e) => {
        showError();
      });
  };
  return (
    <Button size="3" type="button" color="red" onClick={() => deleteItem()}>
      {t("dashboard.itemForm.deleteItem")}
    </Button>
  );
};

export default DeleteItemButton;
