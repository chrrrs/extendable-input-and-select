import React, { forwardRef, ReactNode } from "react";
import { InputGroup } from "../InputGroup";
import { InputLeftElement, InputRightElement } from "../InputGroup/InputGroup";
import { InputElement, InputElementProps } from "../InputElement";
import { InputError } from "../InputError";

export interface InputProps extends InputElementProps {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  errorText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { leftElement, rightElement, isInvalid, errorText, ...rest } = props;

  return (
    <div className="relative">
      <InputGroup>
        {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
        <InputElement ref={ref} isInvalid={isInvalid} hint="test" {...rest} />
        {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      </InputGroup>
      {isInvalid && Boolean(errorText) && <InputError text={errorText} />}
    </div>
  );
});

Input.displayName = "Input";
