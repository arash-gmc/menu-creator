import { Button, Dialog, Flex, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";
import useItems from "../../../hooks/useItems";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  percent: number;
  category?: string;
  reset: () => void;
}
const ApplyChangePrices = ({ percent, category, reset }: Props) => {
  let { data: items } = useItems();
  if (category) items = items?.filter((item) => item.category === category);
  const client = useQueryClient();
  const sendToServer = () => {
    const sendingObject = {
      percent,
      category: category === "0" ? undefined : category,
    };
    axios
      .put("/api/items/change-prices", sendingObject)
      .then((res) => {
        toast.success("Prices are changed successfully.");
        reset();
        client.invalidateQueries();
      })
      .catch((e) => {
        console.log(e);
        toast.error("There was a problem with changing prices.");
      });
  };
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button disabled={percent === 0}>See Changes</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Item Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Old</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>New</Table.ColumnHeaderCell>
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
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => sendToServer()}>Apply Changes</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ApplyChangePrices;
