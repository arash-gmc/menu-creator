import React, { useEffect, useState } from "react";
import ItemForm, { Data } from "./components/ItemForm";
import axios, { AxiosError } from "axios";
import { Heading } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

const AddItem = () => {
  const [isSending, setSending] = useState(false);
  const { t } = useTranslation();
  const addToserver = (
    data: Data,
    onSuccess: (data: Data) => void,
    onFail: (error: AxiosError) => void
  ) => {
    setSending(true);
    axios
      .post("/api/items/add-one", {
        ...data,
        category: data.category === "-" ? null : data.category,
      })
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((error: AxiosError) => {
        onFail(error);
        console.log(error);
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
