import { Flex, Popover, Select } from "@radix-ui/themes";
import { Control, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Data } from ".";

export interface SelectData {
  value: string;
  label: string;
}

interface Props {
  control: Control<Data, any>;
  options: SelectData[];
  placeholder?: string;
  name: "percent" | "dueDays";
  disabled?: boolean;
}

const Selector = ({ control, options, placeholder, name, disabled }: Props) => {
  const { i18n } = useTranslation();

  return (
    <div className="w-full">
      <Flex direction="column">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select.Root
              onValueChange={field.onChange}
              disabled={disabled}
              dir={i18n.dir()}
            >
              <Select.Trigger placeholder={placeholder || "Select One"} />
              <Select.Content>
                {options.map((option) => (
                  <Select.Item value={option.value} key={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
      </Flex>
    </div>
  );
};

export default Selector;
