import {
  Box,
  Button,
  Flex,
  Popover,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Data } from "./ItemForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CategoryIcon from "../../../components/CategoryIcon";

interface Props {
  control: Control<Data, any>;
  changeCategory: (category: string) => void;
}

const SelectCategory = ({ control, changeCategory }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const { t, i18n } = useTranslation();
  const newCategoryRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    axios
      .get<string[]>("/api/items/get-categories")
      .then((res) => setCategories(res.data));
  }, []);

  const addCategory = () => {
    const newCategory = newCategoryRef.current?.value;
    if (!newCategory) return;
    if (categories.includes(newCategory)) return changeCategory(newCategory);
    setCategories((prev) => [newCategory, ...prev]);
    setTimeout(() => changeCategory(newCategory), 100);
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
        <Popover.Content width="200px">
          <Flex direction="column" gap="3" align="start">
            <Text size="2" color="gray">
              {t("dashboard.category.newWindowLabel")}
            </Text>
            <TextField.Root ref={newCategoryRef} />
            <Popover.Close>
              <Button onClick={() => addCategory()}>{t("common.ok")}</Button>
            </Popover.Close>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default SelectCategory;
