import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import { ItemCheck } from "../pages/dashboard/Discount";

interface Props {
  discount: number;
  items: ItemCheck[] | undefined;
  handleCheckChange: (itemId: string, status: boolean) => void;
}

const DiscountItems = ({ discount, items, handleCheckChange }: Props) => {
  const newPrice = (oldPrice: number, percent: number) =>
    Math.floor(oldPrice * (1 - percent / 100));

  return (
    <Box px={{ initial: "1", md: "5" }} mx="2">
      <Flex direction="column">
        {items?.map((item, index) => (
          <div key={item.id}>
            {(index === 0 || item.category !== items[index - 1].category) && (
              <Flex
                key={item.category}
                align="center"
                justify="center"
                gap="2"
                className="border-b-2 pb-2"
                my="3"
              >
                <Text weight="bold">{item.category || "No Category"}</Text>
              </Flex>
            )}

            <div className="grid grid-cols-5" key={item.id}>
              <div className="col-span-3">
                <Flex key={item.id} mx="4" my="2" align="center" gap="2">
                  <Checkbox
                    defaultChecked={item.isChecked}
                    onCheckedChange={(e) =>
                      handleCheckChange(item.id, !!e.valueOf())
                    }
                    disabled={!discount && discount !== 0}
                  />
                  <Text mx="2">{item.name}</Text>
                </Flex>
              </div>
              <div className="col-span-2">
                <Text
                  className={
                    discount === 0 && item.isChecked
                      ? ""
                      : item.isChecked
                      ? "line-through text-red-600 font-normal"
                      : item.offPercent &&
                        new Date() < new Date(item.offDueDate)
                      ? "line-through text-gray-400 font-normal"
                      : ""
                  }
                >
                  {item.price}
                </Text>
                <Text weight="bold" ml="6">
                  {discount === 0 && item.isChecked
                    ? ""
                    : item.isChecked
                    ? newPrice(item.price, discount)
                    : item.offPercent && new Date() < new Date(item.offDueDate)
                    ? newPrice(item.price, item.offPercent)
                    : ""}
                </Text>
                <Text size="1" ml="6">
                  {discount == 0 && item.isChecked
                    ? ""
                    : item.isChecked
                    ? `${discount}% off`
                    : item.offPercent && new Date() < new Date(item.offDueDate)
                    ? `${item.offPercent}% off`
                    : ""}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </Flex>
    </Box>
  );
};

export default DiscountItems;
