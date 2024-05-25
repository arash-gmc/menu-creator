import React, { FormEvent, useEffect, useState } from "react";
import "./components/disableDefaultForm.css";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Select,
  Slider,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { BsArrowUp, BsArrowUpCircleFill } from "react-icons/bs";
import toast from "react-hot-toast";

const ChangePrice = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [changeType, setChangeType] = useState<"inc" | "dec">("inc");
  const percent = Math.floor(sliderValue / 2) * (changeType === "dec" ? -1 : 1);

  useEffect(() => {
    axios
      .get<string[]>("/api/items/get-categories", {
        headers: { noDefault: "true" },
      })
      .then((res) => setCategories(res.data));
  }, []);
  const sendToServer = (e: FormEvent) => {
    e.preventDefault();
    const sendingObject = {
      percent,
      category: selectedCategory === "0" ? undefined : selectedCategory,
    };
    axios
      .put("/api/items/change-prices", sendingObject)
      .then((res) => {
        toast.success("Prices are changed successfully.");
      })
      .catch((e) => {
        console.log(e);
        toast.error("There was a problem with changing prices.");
      });
  };
  return (
    <div>
      <form className="lg:px-20" onSubmit={sendToServer}>
        <Heading mb="5">Change Prices</Heading>
        <Grid columns="20% 75%" gap="4" align="center">
          <Box>
            <Text>Percent</Text>
          </Box>
          <Box>
            <Flex align="center" gap="2">
              <Slider
                value={[sliderValue]}
                onValueChange={(e) => setSliderValue(e[0].valueOf())}
              />
              <Text
                size="4"
                weight="bold"
                wrap="nowrap"
                color={percent > 0 ? "green" : percent < 0 ? "red" : undefined}
              >
                {percent > 0 ? "+" : ""}
                {percent}%
              </Text>
            </Flex>
          </Box>

          <Box>
            <Text>Type</Text>
          </Box>
          <Box>
            <Select.Root
              defaultValue="inc"
              value={changeType}
              onValueChange={(e) => setChangeType(e.valueOf() as "inc" | "dec")}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="inc">Increase</Select.Item>
                <Select.Item value="dec">Decrease</Select.Item>
              </Select.Content>
            </Select.Root>
          </Box>

          <Box>
            <Text>Category</Text>
          </Box>
          <Box>
            <Select.Root
              defaultValue="0"
              value={selectedCategory}
              onValueChange={(e) => setSelectedCategory(e.valueOf())}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="0">All Categories</Select.Item>
                <Select.Separator />
                {categories.map((category) => (
                  <Select.Item value={category} key={category}>
                    {category}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>
          <Box></Box>
          <Box>
            <Button>Apply Changes</Button>
          </Box>
        </Grid>
      </form>
    </div>
  );
};

export default ChangePrice;
