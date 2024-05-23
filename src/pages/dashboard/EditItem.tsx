import { Flex } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import ItemForm, { Data } from "./components/ItemForm";
import ItemSelector from "./components/ItemSelector";
import useItems from "../../hooks/useItems";
import useMyStore from "../../store";
import toast from "react-hot-toast";

const EditItem = () => {
  const { data: items, isLoading } = useItems();
  const selectedId = useMyStore((s) => s.editingItemId);

  const editOnServer = (
    data: Data,
    onSuccess: (data: Data) => void,
    onFail: (error: AxiosError) => void
  ) => {
    const updateObj = {
      ...data,
      id: selectedId,
      category: data.category === "-" ? null : data.category,
    };
    axios.put("/api/items/edit-one", updateObj).then();
    toast.success("Your Item has been updated successfully.");
  };

  return (
    <div>
      <Flex direction="column" mb="5">
        <ItemSelector items={items} />
      </Flex>
      {selectedId && (
        <ItemForm
          application="update"
          isLoading={isLoading}
          onFormSubmit={editOnServer}
          initialData={items?.find((item) => item.id === selectedId)}
        />
      )}
    </div>
  );
};

export default EditItem;
