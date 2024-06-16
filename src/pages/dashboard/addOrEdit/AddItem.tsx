import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Heading } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import ItemForm from "./ItemForm";
import { ItemFormData } from "../../../interfaces";
import showMessage from "../../../services/showMessage";
import ApiClient from "../../../services/apiClient";
import showError from "../../../services/showError";

const AddItem = () => {
  const [isSending, setSending] = useState(false);
  const { t } = useTranslation();
  const apiClient = new ApiClient();
  const addToserver = (data: ItemFormData) => {
    setSending(true);
    apiClient
      .addItem(data)
      .then((res) => {
        showMessage("addItem", { name: data.name });
      })
      .catch((error) => {
        showError();
      })
      .finally(() => setSending(false));
  };

  return (
    <div>
      <Heading my="5">{t("dashboard.itemForm.addTitle")}</Heading>
      <ItemForm
        application="add"
        onFormSubmit={addToserver}
        isLoading={isSending}
      />
    </div>
  );
};

export default AddItem;
