import React, { forwardRef } from "react";
import { Select, SelectProps } from "../Select";

export interface SelectWithOptionsProps extends Omit<SelectProps, "children"> {
  /**
   * The Map values will be used as follows:
   * - first value will be used as the option value
   * - second value will be used as the option label
   *
   * @example
   * new Map([
   *  ["", ""],
   *  ["1", "Dog"],
   *  ["2", "Cat"],
   *  ["3", "Turtle"]
   * ])
   */
  options: Map<string, string>;
}

export const SelectWithOptions = forwardRef<
  HTMLSelectElement,
  SelectWithOptionsProps
>((props, ref) => {
  const { options, ...rest } = props;

  return (
    <Select ref={ref} {...rest}>
      {Array.from(options).map(([value, label]) => {
        if (value.length === 0 && label.length === 0) {
          return (
            <option value={value} hidden>
              {label}
            </option>
          );
        }

        return <option value={value}>{label}</option>;
      })}
    </Select>
  );
});
