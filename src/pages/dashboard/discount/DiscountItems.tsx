import { Box, Checkbox, Flex, Grid, Text } from "@radix-ui/themes";
import { ItemCheck } from ".";
import { useTranslation } from "react-i18next";

interface Props {
  discount: number;
  items: ItemCheck[] | undefined;
  handleCheckChange: (itemId: string, status: boolean) => void;
}

const DiscountItems = ({ discount, items, handleCheckChange }: Props) => {
  const newPrice = (oldPrice: number, percent: number) =>
    Math.floor(oldPrice * (1 - percent / 100));
  const { t } = useTranslation();
  return (
    <Box px={{ initial: "1", md: "5" }} mx={{ initial: "0", md: "2" }}>
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

            <Grid
              columns={{
                initial: "1fr 2rem 2rem 4rem",
                md: "1fr 4rem 4rem 6rem",
              }}
              gap="3"
              align="center"
            >
              <Box>
                <Flex
                  mx={{ initial: "0", md: "4" }}
                  my="2"
                  align="center"
                  gap="2"
                >
                  <Checkbox
                    checked={item.isChecked}
                    onCheckedChange={(e) =>
                      handleCheckChange(item.id, !!e.valueOf())
                    }
                    disabled={!discount && discount !== 0}
                  />
                  <Text mx="2">{item.name}</Text>
                </Flex>
              </Box>
              <Box>
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
              </Box>
              <Box>
                <Text weight="bold">
                  {discount === 0 && item.isChecked
                    ? ""
                    : item.isChecked
                    ? newPrice(item.price, discount)
                    : item.offPercent && new Date() < new Date(item.offDueDate)
                    ? newPrice(item.price, item.offPercent)
                    : ""}
                </Text>
              </Box>
              <Box>
                <Text size="1">
                  {discount == 0 && item.isChecked
                    ? ""
                    : item.isChecked
                    ? `${discount}% ${t("dashboard.discount.off")}`
                    : item.offPercent && new Date() < new Date(item.offDueDate)
                    ? `${item.offPercent}% ${t("dashboard.discount.off")}`
                    : ""}
                </Text>
              </Box>
            </Grid>
          </div>
        ))}
      </Flex>
    </Box>
  );
};

export default DiscountItems;
