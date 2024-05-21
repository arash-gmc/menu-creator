import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../interfaces";

const useItemsInGroups = (items: Item[] | undefined) => {
  const [itemGroups, setItemGroups] = useState<Item[][]>();
  useEffect(() => {
    if (items) {
      const outer: Item[][] = [];
      let inner: Item[] = [];
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
