import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DiscountItems from "./components/DiscountItems";
import Selector, { SelectData } from "./components/Selector";
import "./components/disableDefaultForm.css";
import useItems from "../../hooks/useItems";
import { Item } from "../../interfaces";
import { render } from "react-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export interface Data {
  percent: string;
  dueDays: string;
}

export interface ItemCheck extends Item {
  isChecked: boolean;
}

const Discount = () => {
  const { t: tr } = useTranslation();
  const t = tr("dashboard.discount") as any;

  const percents: SelectData[] = [
    { value: "5", label: "5 " + t.percent },
    { value: "10", label: "10 " + t.percent },
    { value: "15", label: "15 " + t.percent },
    { value: "20", label: "20 " + t.percent },
    { value: "25", label: "25 " + t.percent },
    { value: "30", label: "30 " + t.percent },
    { value: "50", label: "50 " + t.percent },
    { value: "0", label: `--${t.removeDiscount}--` },
  ];

  const dueDate: SelectData[] = [
    { value: "1", label: "1 " + t.day },
    { value: "2", label: "2 " + t.days },
    { value: "3", label: "3 " + t.days },
    { value: "7", label: "1 " + t.week },
    { value: "14", label: "2 " + t.weeks },
    { value: "30", label: "1 " + t.month },
    { value: "60", label: "2 " + t.months },
    { value: "90", label: "3 " + t.months },
    { value: "365", label: "1 " + t.year },
  ];

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
    axios
      .put("/api/items/set-discount", {
        percent,
        dueDays,
        itemIds,
      })
      .then(() => {
        changeCheckAll("uncheck");
        refetch();
        toast.success("Your discounts has been submitted.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("There was an error with updating discounts.");
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
    axios
      .put("/api/items/remove-discounts")
      .then(() => {
        setItems((prev) =>
          prev?.map((item) => ({ ...item, isChecked: false }))
        );
        refetch();
        toast.success("All discounts has been removed.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("There was a problem.");
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
      <Grid columns={{ initial: "1", lg: "75% 25%" }} flow="dense">
        <DiscountItems
          discount={discount}
          handleCheckChange={handleCheckChange}
          items={items}
        />

        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Flex direction="column" gap="4" mt={{ initial: "6", lg: "0" }}>
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
