import {
  Box,
  Flex,
  Grid,
  Heading,
  Select,
  Slider,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import ApplyChangePrices from "./ApplyChangePrices";
import { useTranslation } from "react-i18next";

const ChangePrice = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [changeType, setChangeType] = useState<"inc" | "dec">("inc");
  const percent = Math.floor(sliderValue / 2) * (changeType === "dec" ? -1 : 1);

  useEffect(() => {
    axios
      .get<string[]>("/api/items/get-categories")
      .then((res) => setCategories(res.data));
  }, []);

  const reset = () => {
    setSelectedCategory("0");
    setSliderValue(0);
    setChangeType("inc");
  };
  const { t: tr, i18n } = useTranslation();
  const t = tr("dashboard.price") as any;
  return (
    <div>
      <Heading mb="5">{t.header}</Heading>
      <Grid columns="20% 75%" gap="4" align="center">
        <Box>
          <Text>{t.percent}</Text>
        </Box>
        <Box>
          <Flex align="center" gap="2">
            <Slider
              step={2}
              value={[sliderValue]}
              onValueChange={(e) => setSliderValue(e[0].valueOf())}
              dir={i18n.dir()}
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
          <Text>{t.type}</Text>
        </Box>
        <Box>
          <Select.Root
            defaultValue="inc"
            value={changeType}
            onValueChange={(e) => setChangeType(e.valueOf() as "inc" | "dec")}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="inc">{t.increase}</Select.Item>
              <Select.Item value="dec">{t.decrease}</Select.Item>
            </Select.Content>
          </Select.Root>
        </Box>

        <Box>
          <Text>{tr("dashboard.category.label")}</Text>
        </Box>
        <Box>
          <Select.Root
            defaultValue="0"
            value={selectedCategory}
            onValueChange={(e) => setSelectedCategory(e.valueOf())}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="0">
                {tr("dashboard.category.allCategories")}
              </Select.Item>
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
          <ApplyChangePrices
            percent={percent}
            category={selectedCategory === "0" ? undefined : selectedCategory}
            reset={reset}
          />
        </Box>
      </Grid>
    </div>
  );
};

export default ChangePrice;
