import "./Form.css";
import { Button, Flex } from "@radix-ui/themes";
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
}

const Form = ({ inputs, passData, formName }: Props) => {
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
          <Flex justify="center" m="5">
            <Button size="3">{formName}</Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default Form;
