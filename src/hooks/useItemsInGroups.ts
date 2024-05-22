import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../interfaces";

interface input extends Item {
  isChecked: boolean;
  [key: string]: any;
}

const useItemsInGroups = (items: input[] | undefined) => {
  const [itemGroups, setItemGroups] = useState<input[][]>();
  useEffect(() => {
    if (items) {
      const outer: input[][] = [];
      let inner: input[] = [];
      items.forEach((item, index) => {
        if (index === items.length - 1) return outer.push(inner);
        inner.push(item);
        if (item.category !== items[index + 1].category) {
          outer.push(inner);
          inner = [];
        }
      });
      setItemGroups(outer);
    }
  }, [!!items]);
  return { itemGroups };
};

export default useItemsInGroups;
