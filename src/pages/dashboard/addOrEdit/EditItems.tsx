import { Flex, Heading } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import useItems from "../../../hooks/useItems";
import useMyStore from "../../../store";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ItemForm, { Data } from "./ItemForm";
import ItemSelector from "./ItemSelector";

const EditItem = () => {
  const { data: items, isLoading } = useItems();
  const { changeName, editingItemId } = useMyStore();
  const { t } = useTranslation();

  const editOnServer = (data: Data) => {
    const updateObj = {
      ...data,
      id: editingItemId,
      category: data.category === "-" ? null : data.category,
    };
    axios.put("/api/items/edit-one", updateObj).then();
    toast.success(t("messages.updateItem", { name: data.name }));
    changeName(editingItemId, data.name);
  };

  return (
    <div>
      <Heading my="5">{t("dashboard.itemForm.editTitle")}</Heading>
      <Flex direction="column" mb="5">
        <ItemSelector items={items} />
      </Flex>
      {editingItemId && (
        <ItemForm
          application="update"
          isLoading={isLoading}
          onFormSubmit={editOnServer}
          initialData={items?.find((item) => item.id === editingItemId)}
        />
      )}
    </div>
  );
};

export default EditItem;
