import React from "react";
import ItemForm, { Data } from "../../components/ItemForm";
import { FieldValues, UseFormReset } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddItem = () => {
  const addToserver = (data: Data, onSuccess: () => void) => {
    axios
      .post("/api/items/add-one", data)
      .then((res) => {
        console.log(res.data);
        onSuccess();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <ItemForm onFormSubmit={addToserver} />
    </div>
  );
};

export default AddItem;
