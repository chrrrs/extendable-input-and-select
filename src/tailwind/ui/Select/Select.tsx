import React, { forwardRef, ReactNode } from "react";
import { InputGroup } from "../InputGroup";
import { InputLeftElement, InputRightElement } from "../InputGroup/InputGroup";
import { InputError } from "../InputError";
import {
  SelectElement,
  SelectElementProps
} from "../SelectElement/SelectElement";

export interface SelectProps extends SelectElementProps {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  errorText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { leftElement, rightElement, isInvalid, errorText, ...rest } = props;

    return (
      <div className="relative">
        <InputGroup>
          {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
          <SelectElement
            ref={ref}
            isInvalid={isInvalid}
            hint="test"
            {...rest}
          />
          {rightElement && (
            <InputRightElement>{rightElement}</InputRightElement>
          )}
        </InputGroup>
        {isInvalid && Boolean(errorText) && <InputError text={errorText} />}
      </div>
    );
  }
);

Select.displayName = "Select";
