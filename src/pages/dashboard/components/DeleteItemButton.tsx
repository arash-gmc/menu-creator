import { Button } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useMyStore from "../../../store";

interface Props {
  itemId: string;
  itemCategory: string | null;
}

const DeleteItemButton = ({ itemId, itemCategory }: Props) => {
  const { setEditingItemId, removeItemGroup } = useMyStore();
  const { t } = useTranslation();
  const deleteItem = () => {
    axios.delete("/api/items/delete/" + itemId).then((res) => {
      setEditingItemId(undefined);
      removeItemGroup(itemId, itemCategory);
      toast.success("Your Item has been deleted successfully.");
    });
  };
  return (
    <Button size="3" type="button" color="red" onClick={() => deleteItem()}>
      {t("dashboard.itemForm.deleteItem")}
    </Button>
  );
};

export default DeleteItemButton;
