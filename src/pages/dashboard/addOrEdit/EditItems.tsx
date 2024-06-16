import { Flex, Heading } from "@radix-ui/themes";
import useItems from "../../../hooks/useItems";
import useMyStore from "../../../store";
import { useTranslation } from "react-i18next";
import ItemForm from "./ItemForm";
import { ItemFormData } from "../../../interfaces";
import ItemSelector from "./ItemSelector";
import ApiClient from "../../../services/apiClient";
import showMessage from "../../../services/showMessage";
import showError from "../../../services/showError";

const EditItem = () => {
  const { data: items, isLoading } = useItems();
  const { changeName, editingItemId } = useMyStore();
  const { t } = useTranslation();
  const apiClient = new ApiClient();

  const editOnServer = (data: ItemFormData) => {
    const updateObj = {
      ...data,
      id: editingItemId,
      category: data.category === "-" ? null : data.category,
    };
    apiClient
      .editItem(updateObj)
      .then((res) => {
        showMessage("updateItem", { name: data.name });
        changeName(editingItemId, data.name);
      })
      .catch((e) => showError());
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
