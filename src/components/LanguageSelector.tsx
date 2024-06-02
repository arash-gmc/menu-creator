import { Select } from "@radix-ui/themes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language]);
  return (
    <Select.Root
      defaultValue={i18n.language}
      onValueChange={(e) => i18n.changeLanguage(e.valueOf())}
    >
      <Select.Trigger variant="ghost" />
      <Select.Content>
        <Select.Item value="fa">FA</Select.Item>
        <Select.Item value="en">EN</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default LanguageSelector;
