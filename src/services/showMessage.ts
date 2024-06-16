import i18next from "i18next";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const showMessage = (messageCode?: string) => {
  const { t } = i18next;
  if (messageCode) toast.error(t("messages." + messageCode));
  else toast.success(t("messages.successMessage"));
  return null;
};

export default showMessage;
