import React, { forwardRef, ReactNode } from "react";
import { InputGroup } from "../InputGroup";
import { InputLeftElement, InputRightElement } from "../InputGroup/InputGroup";
import { InputError } from "../InputError";
import {
  SelectElement,
  SelectElementProps
} from "../SelectElement/SelectElement";
import { ChevronDown } from "react-feather";
import classNames from "classnames";

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
            className={classNames({
              "pr-24": Boolean(rightElement)
            })}
            {...rest}
          />

          <div
            className={classNames(
              "absolute right-0 pointer-events-none px-2 h-full flex items-center",
              {
                "mr-12": Boolean(rightElement)
              }
            )}
          >
            <ChevronDown />
          </div>

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
