import i18next from "../../../i18next";
import { SelectData } from "./DiscountSelector";

const t = i18next.t("dashboard.discount") as any;

export const percents: SelectData[] = [
  { value: "5", label: "5 " + t.percent },
  { value: "10", label: "10 " + t.percent },
  { value: "15", label: "15 " + t.percent },
  { value: "20", label: "20 " + t.percent },
  { value: "25", label: "25 " + t.percent },
  { value: "30", label: "30 " + t.percent },
  { value: "50", label: "50 " + t.percent },
  { value: "0", label: `--${t.removeDiscount}--` },
];

export const dueDate: SelectData[] = [
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
