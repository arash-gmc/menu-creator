import i18next from "i18next";
import toast from "react-hot-toast";

const showError = (errorCode?: string) => {
  const { t } = i18next;
  if (errorCode) toast.error(t("messages." + errorCode));
  else toast.error(t("messages.generalError"));
};

export default showError;
