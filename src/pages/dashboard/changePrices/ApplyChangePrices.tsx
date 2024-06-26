import { Button, Dialog, Flex, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";
import useItems from "../../../hooks/useItems";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import ApiClient from "../../../services/apiClient";
import showMessage from "../../../services/showMessage";
import showError from "../../../services/showError";

interface Props {
  percent: number;
  category?: string;
  reset: () => void;
}
const ApplyChangePrices = ({ percent, category, reset }: Props) => {
  let { data: items } = useItems();
  if (category) items = items?.filter((item) => item.category === category);
  const client = useQueryClient();
  const apiClient = new ApiClient();
  const { t: tr } = useTranslation();
  const t = tr("dashboard.price") as any;
  const sendToServer = () => {
    const sendingObject = {
      percent,
      category: category === "0" ? undefined : category,
    };
    apiClient
      .changePrice(sendingObject)
      .then(() => {
        showMessage("changePrice");
        reset();
        client.invalidateQueries();
      })
      .catch((e) => {
        showError();
      });
  };
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button disabled={percent === 0}>{t.seeChanges}</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>{t.itemName}</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>{t.category}</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>{t.oldPrice}</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>{t.newPrice}</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items?.map((item) => (
                <Table.Row key={item.id} align="center">
                  <Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>
                    <Text weight="bold">{item.price}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text
                      color={
                        percent > 0 ? "green" : percent < 0 ? "red" : undefined
                      }
                      weight="bold"
                    >
                      {Math.floor(item.price * (1 + percent / 100))}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Flex justify="center" gap="3" m="5">
            <Dialog.Close>
              <Button variant="outline">{tr("common.cancel")}</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => sendToServer()}>{t.applyChanges}</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ApplyChangePrices;
