import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Heading } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import ItemForm, { Data } from "./ItemForm";
import showMessage from "../../../services/showMessage";
import ApiClient from "../../../services/apiClient";

const AddItem = () => {
  const [isSending, setSending] = useState(false);
  const { t } = useTranslation();
  const apiClient = new ApiClient();
  const addToserver = (data: Data) => {
    setSending(true);
    apiClient
      .addItem(data)
      .then((res) => {
        showMessage("addItem", { name: data.name });
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
