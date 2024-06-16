import i18next from "i18next";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const showMessage = (
  messageCode?: string,
  placeholders?: Record<string, string>
) => {
  const { t } = i18next;
  if (messageCode) toast.success(t("messages." + messageCode, placeholders));
  else toast.success(t("messages.successMessage"));
  return null;
};

export default showMessage;
