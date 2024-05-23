import React, { useEffect, useState } from "react";
import ItemForm, { Data } from "./components/ItemForm";
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
      <ItemForm
        application="add"
        onFormSubmit={addToserver}
        isLoading={isSending}
      />
    </div>
  );
};

export default AddItem;
