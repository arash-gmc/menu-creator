import { Flex, Select } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Providers";
import { Item } from "../../interfaces";
import ItemSelector from "../../components/ItemSelector";
import ItemForm, { Data } from "../../components/ItemForm";
import useItems from "../../hooks/useItems";

const EditItem = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const { data: items, isLoading } = useItems();

  const onSelect = (id: string) => {
    setSelectedId(id);
  };
  const editOnServer = (
    data: Data,
    onSuccess: (data: Data) => void,
    onFail: (error: AxiosError) => void
  ) => {
    console.log(data);
  };

  return (
    <div>
      <Flex direction="column" mb="5">
        <ItemSelector items={items} onSelect={onSelect} />
      </Flex>
      {selectedId && (
        <ItemForm
          application="update"
          isLoading={isLoading}
          onFormSubmit={editOnServer}
          initialData={items?.find((item) => item.id === selectedId)}
          reset={() => setSelectedId(undefined)}
        />
      )}
    </div>
  );
};

export default EditItem;
