import { Button, Flex } from "@radix-ui/themes";
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

export interface Data {
  percent: string;
  dueDays: string;
}

export interface ItemCheck extends Item {
  isChecked: boolean;
}

const percents: SelectData[] = [
  { value: "5", label: "5 Percent" },
  { value: "10", label: "10 Percent" },
  { value: "15", label: "15 Percent" },
  { value: "20", label: "20 Percent" },
  { value: "25", label: "25 Percent" },
  { value: "30", label: "30 Percent" },
  { value: "50", label: "50 Percent" },
  { value: "0", label: "--Remove discount--" },
];
const dueDate: SelectData[] = [
  { value: "1", label: "1 Day" },
  { value: "2", label: "2 Days" },
  { value: "3", label: "3 Days" },
  { value: "7", label: "1 Week" },
  { value: "14", label: "2 Weeks" },
  { value: "30", label: "1 Month" },
  { value: "60", label: "2 Months" },
  { value: "90", label: "3 Months" },
  { value: "365", label: "1 Year" },
];

const Discount = () => {
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
        setItems((prev) =>
          prev?.map((item) => ({ ...item, isChecked: false }))
        );
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
    <div className="grid grid-cols-4 gap-y-8 gap-x-2">
      <div className="col-span-3 max-md:col-span-4">
        <DiscountItems
          discount={discount}
          handleCheckChange={handleCheckChange}
          items={items}
        />
      </div>
      <div className="col-span-1 max-md:mx-10 max-md:col-span-4">
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Flex direction="column" gap="4">
            <Selector
              control={control}
              name="percent"
              placeholder="Discount Persent"
              options={percents}
            />
            <Selector
              disabled={watch("percent") === "0"}
              placeholder="Days until end"
              control={control}
              name="dueDays"
              options={dueDate}
            />
            <Button disabled={isApplyDisable()}>Apply Discounts</Button>
            <Button type="button" onClick={() => removeAllDiscounts()}>
              Remove All Discounts
            </Button>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default Discount;
