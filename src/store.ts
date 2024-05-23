import { create } from "zustand";
import { Item } from "./interfaces";

interface Store {
  editingItemId: string | undefined;
  setEditingItemId: (id: string | undefined) => void;
  itemGroups: Item[][];
  setItemGroups: (itemGroups: Item[][]) => void;
  removeItemGroup: (itesmId: string, itemCategory: string | null) => void;
}

const useMyStore = create<Store>((set) => ({
  editingItemId: undefined,
  setEditingItemId: (id) => set(() => ({ editingItemId: id })),
  itemGroups: [],
  setItemGroups: (itemGroup) => set(() => ({ itemGroups: itemGroup })),
  removeItemGroup: (itemId, itemCategory) =>
    set((prev) => {
      const newItemGroup = prev.itemGroups
        .map((g) =>
          g[0].category !== itemCategory ? g : g.filter((i) => i.id !== itemId)
        )
        .filter((g) => g.length > 0);
      return { itemGroups: newItemGroup };
    }),
}));

export default useMyStore;
