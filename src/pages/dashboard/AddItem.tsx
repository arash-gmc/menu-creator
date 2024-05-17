import React, { useState } from "react";
import ItemForm, { Data } from "../../components/ItemForm";
import { FieldValues, UseFormReset } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const AddItem = () => {
  const [isSending, setSending] = useState(false);
  const addToserver = (
    data: Data,
    onSuccess: (data: Data) => void,
    onFail: (error: AxiosError) => void
  ) => {
    setSending(true);
    axios
      .post("/api/items/add-one", data)
      .then((res) => {
        console.log(res.data);
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
      <ItemForm onFormSubmit={addToserver} isLoading={isSending} />
    </div>
  );
};

export default AddItem;
