import {
  Box,
  Button,
  Flex,
  Popover,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Data } from "./ItemForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CategoryIcon, {
  categoryIconMap,
} from "../../../components/CategoryIcon";
import { UserContext } from "../../../Providers";

interface Props {
  control: Control<Data, any>;
  changeCategory: (category: string) => void;
}

const SelectCategory = ({ control, changeCategory }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const user = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const [newCategory, setNewCategory] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const allCategorySuggests = Object.keys(categoryIconMap);
  console.log(user);
  useEffect(() => {
    if (user)
      axios
        .get<string[]>("/api/items/get-categories", {
          headers: { lng: i18n.language, type: user.type },
        })
        .then((res) => setCategories(res.data));
  }, [user, i18n.language]);

  const addCategory = (category: string) => {
    if (!category) return;
    if (categories.includes(category)) return changeCategory(category);
    setCategories((prev) => [category, ...prev]);
    setTimeout(() => changeCategory(category), 100);
  };
  const handleNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setNewCategory(input);
    if (input.length > 1) {
      const filtered = allCategorySuggests.filter((category) =>
        category.includes(input.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  };
  if (!categories) return null;
  return (
    <Flex justify="between">
      <div className="w-full">
        <Flex direction="column">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select.Root
                onValueChange={field.onChange}
                value={field.value}
                dir={i18n.dir()}
              >
                <Select.Trigger placeholder={t("dashboard.category.label")} />
                <Select.Content>
                  <Select.Item value="-" dir={i18n.dir()}>
                    {t("dashboard.category.noCategory")}
                  </Select.Item>
                  <Select.Separator />
                  {categories.map((item) => (
                    <Select.Item value={item} key={item} dir={i18n.dir()}>
                      <Flex align="center" gap="3">
                        <CategoryIcon size="xs" category={item} />
                        {item}
                      </Flex>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </Flex>
      </div>

      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft" type="button" mx="2">
            {t("dashboard.category.new")}
          </Button>
        </Popover.Trigger>
        <Popover.Content width="240px" style={{ overflow: "visible" }}>
          <Flex direction="column" gap="3" align="start">
            <Text size="2" color="gray">
              {t("dashboard.category.newWindowLabel")}
            </Text>
            <Flex gap="2">
              <div className="relative">
                <TextField.Root
                  value={newCategory}
                  onChange={handleNewCategory}
                />
                {filteredCategories.length > 0 && (
                  <Box className="absolute bg-slate-200 w-full">
                    {filteredCategories.map((category) => (
                      <Popover.Close key={category}>
                        <button
                          onClick={() => {
                            addCategory(category);
                            setNewCategory("");
                            setFilteredCategories([]);
                          }}
                        >
                          <Flex
                            align="center"
                            py="2"
                            mx="1"
                            gap="2"
                            className="border-b-2 border-white"
                          >
                            <CategoryIcon size="xs" category={category} />
                            <Text size="2">{category}</Text>
                          </Flex>
                        </button>
                      </Popover.Close>
                    ))}
                  </Box>
                )}
              </div>
              <Popover.Close>
                <Button
                  onClick={() => {
                    addCategory(newCategory);
                    setNewCategory("");
                    setFilteredCategories([]);
                  }}
                >
                  {t("common.ok")}
                </Button>
              </Popover.Close>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default SelectCategory;
