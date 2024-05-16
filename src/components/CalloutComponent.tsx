import { Callout } from "@radix-ui/themes";
import React from "react";
import { MdOutlineDangerous } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

interface Props {
  message: string;
  color?: "red" | "green" | "blue";
}

const CalloutComponent = ({ message, color }: Props) => {
  if (!message) return null;
  return (
    <Callout.Root color={color}>
      <Callout.Icon>
        {color === "green" ? (
          <SiTicktick />
        ) : color === "red" ? (
          <MdOutlineDangerous />
        ) : (
          ""
        )}
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};

export default CalloutComponent;
