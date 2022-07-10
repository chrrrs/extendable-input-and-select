import React from "react";
import { Input, InputProps } from "../Input";
import { InputInfo } from "../InputInfo";

interface TextFieldProps extends InputProps {
  infoText?: string;
}

export const TextField = (props: TextFieldProps) => {
  const { infoText, ...rest } = props;

  return <Input {...rest} rightElement={<InputInfo text={infoText} />} />;
};
