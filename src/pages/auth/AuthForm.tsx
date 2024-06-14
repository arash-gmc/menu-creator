import "./AuthForm.css";
import { Box, Button, Callout, Flex } from "@radix-ui/themes";
import { FieldValues, useForm } from "react-hook-form";

export interface Input {
  placeholder: string;
  name: string;
  type?: "password";
}

interface Props {
  inputs: Input[];
  passData: (data: FieldValues) => void;
  formName: string;
  error?: string;
}

const AuthForm = ({ inputs, passData, formName, error }: Props) => {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit((data) => passData(data))}>
        <Flex direction="column" gap="6">
          <h3>{formName}</h3>
          {inputs.map((input) => (
            <input
              key={input.name}
              placeholder={input.placeholder}
              type={input.type}
              {...register(input.name)}
              className="px-5 bg-cyan-100"
            />
          ))}
          <Flex justify="center" m="2" gap="2" direction="column">
            <Box className="h-12">
              {error && (
                <Callout.Root color="red" size="1">
                  <Callout.Icon></Callout.Icon>
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}
            </Box>
            <Button size="3">{formName}</Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default AuthForm;
