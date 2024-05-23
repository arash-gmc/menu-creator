import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../interfaces";
import useMyStore from "../store";

const useItemsInGroups = (items: Item[] | undefined) => {
  //const [itemGroups, setItemGroups] = useState<Item[][]>();
  const { itemGroups, setItemGroups } = useMyStore();
  useEffect(() => {
    if (items) {
      const outer: Item[][] = [];
      let inner: Item[] = [];
      items.forEach((item, index) => {
        if (index === items.length - 1) {
          inner.push(item);
          outer.push(inner);
          return;
        }
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
