import React, { forwardRef } from "react";
import { InputGroup } from "../InputGroup";
import { InputLeftElement, InputRightElement } from "../InputGroup/InputGroup";
import { InputElement, InputElementProps } from "../InputElement";

export interface InputProps extends InputElementProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputGroup>
      <InputLeftElement>L</InputLeftElement>
      <InputElement ref={ref} {...props} />
      <InputRightElement>R</InputRightElement>
    </InputGroup>
  );
});

Input.displayName = "Input";
