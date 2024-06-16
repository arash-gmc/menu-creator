import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Item } from "../../../interfaces";
import useItems from "../../../hooks/useItems";
import Selector, { SelectData } from "./DiscountSelector";
import DiscountItems from "./DiscountItems";
import ApiClient from "../../../services/apiClient";
import { dueDate, percents } from "./options";
import showError from "../../../services/showError";
import showMessage from "../../../services/showMessage";

export interface Data {
  percent: string;
  dueDays: string;
}

export interface ItemCheck extends Item {
  isChecked: boolean;
}

const Discount = () => {
  const { t: tr, i18n } = useTranslation();
  const t = tr("dashboard.discount") as any;
  const apiClient = new ApiClient();
  const { control, handleSubmit, watch } = useForm<Data>();
  const { data, refetch } = useItems();
  const [items, setItems] = useState<ItemCheck[]>();

  useEffect(() => {
    const items = data?.map((item) => ({ ...item, isChecked: false }));
    setItems(items);
  }, [data]);

  const onSubmit = (data: Data) => {
    const itemIds: string[] | undefined = items
      ?.filter((item) => item.isChecked)
      .map((item) => item.id);
    const percent = Number(data.percent);
    const dueDays = Number(data.dueDays);
    apiClient
      .setDiscount(percent, dueDays, itemIds)
      .then(() => {
        changeCheckAll("uncheck");
        refetch();
        showMessage("discountSubmit");
      })
      .catch((error) => {
        showError();
      });
  };

  const handleCheckChange = (itemId: string, status: boolean) => {
    if (!discount && discount !== 0) return;
    setItems((prev) =>
      prev?.map((i) => (i.id === itemId ? { ...i, isChecked: status } : i))
    );
  };

  const changeCheckAll = (status: "check" | "uncheck") => {
    setItems((prev) =>
      prev?.map((item) => ({ ...item, isChecked: status === "check" }))
    );
  };

  const removeAllDiscounts = () => {
    apiClient
      .removeAllDiscounts()
      .then(() => {
        setItems((prev) =>
          prev?.map((item) => ({ ...item, isChecked: false }))
        );
        refetch();
        showMessage("removeAllDiscounts");
      })
      .catch((error) => {
        showError();
      });
  };

  const isApplyDisable = () => {
    if (!discount && discount !== 0) return true;
    if (!watch("dueDays") && discount !== 0) return true;
    if (items?.filter((item) => item.isChecked).length === 0) return true;
    return false;
  };

  const discount = Number(watch("percent"));

  return (
    <div>
      <Heading>{t.header}</Heading>
      <Grid columns={{ initial: "1", md: "70% 30%" }}>
        <div className="max-lg:order-2">
          <DiscountItems
            discount={discount}
            handleCheckChange={handleCheckChange}
            items={items}
          />
        </div>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="max-lg:order-1"
        >
          <Flex direction="column" gap="4" className="max-w-sm py-4 mx-auto">
            <Selector
              control={control}
              name="percent"
              placeholder={t.discountPercent}
              options={percents}
            />
            <Selector
              disabled={watch("percent") === "0"}
              placeholder={t.due}
              control={control}
              name="dueDays"
              options={dueDate}
            />
            <Button disabled={isApplyDisable()}>{t.apply}</Button>
            <Grid columns="2" gap="3">
              <Button
                disabled={!watch("percent")}
                type="button"
                onClick={() => changeCheckAll("check")}
              >
                {t.checkAll}
              </Button>
              <Button
                disabled={!watch("percent")}
                type="button"
                onClick={() => changeCheckAll("uncheck")}
              >
                {t.uncheckAll}
              </Button>
            </Grid>
            <Button type="button" onClick={() => removeAllDiscounts()}>
              {t.removeAll}
            </Button>
          </Flex>
        </form>
      </Grid>
    </div>
  );
};

export default Discount;
