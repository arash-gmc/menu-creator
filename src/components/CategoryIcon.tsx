import React from "react";

type sizes = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
  size: sizes;
  category: string;
}

//map from category to file name
export const categoryMap: Record<string, string> = {
  //english
  appetizer: "appetizer",
  breakfast: "breakfast",
  tea: "tea",
  coffee: "coffee",
  "cake and sweets": "cake&sweets",
  chicken: "chicken",
  "hot drinks": "hotDrink",
  "cold drink": "coldDrink",
  dessert: "dessert",
  dinner: "dinner",
  burger: "hamburger",
  "ice cream": "iceCream",
  juce: "juce",
  kebab: "kebab",
  lunch: "lunch",
  "milk shake": "milkShake",
  pizza: "pizza",
  rice: "rice",
  salad: "salad",
  sandwich: "sandwich",
  soda: "soda",
  soup: "soup",
  stew: "stew",
  vegan: "vegan",
  "traditional dish": "traditionalDish",
  //persian
  "نوشیدنی گرم": "hotDrink",
  "نوشیدنی سرد": "coldDrink",
  چای: "tea",
  قهوه: "coffee",
  دسر: "dessert",
  شام: "dinner",
  برگر: "hamburger",
  بستنی: "iceCream",
  "آب میوه": "juce",
  کباب: "kebab",
  ناهار: "lunch",
  "میلک شیک": "milkShake",
  پیتزا: "pizza",
  "غذای با برنج": "rice",
  سالاد: "salad",
  ساندویچ: "sandwich",
  نوشیدنی: "soda",
  "سوپ و آش": "soup",
  خورشت: "stew",
  "غذای گیاهی": "vegan",
  "غذای محلی": "traditionalDish",
  "غذای سنتی": "kebab",
  "مرغ سوخاری": "chicken",
};

type SizeMapType = Record<sizes, { folder: string; pixcel: number }>;
const sizeMap: SizeMapType = {
  xs: { folder: "sm", pixcel: 24 },
  sm: { folder: "sm", pixcel: 32 },
  md: { folder: "sm", pixcel: 64 },
  lg: { folder: "lg", pixcel: 256 },
  xl: { folder: "lg", pixcel: 512 },
};

const CategoryIcon = ({ size, category }: Props) => {
  const filename = categoryMap[category.toLowerCase()];
  if (!filename)
    return (
      <canvas width={sizeMap[size].pixcel} height={sizeMap[size].pixcel} />
    );
  return (
    <img
      src={
        "/icons/categories/" + sizeMap[size].folder + "/" + filename + ".png"
      }
      width={sizeMap[size].pixcel}
    />
  );
};

export default CategoryIcon;
