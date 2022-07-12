import React, { useState } from "react";
import { Input, InputProps } from "../Input";

export interface PasswordFieldProps extends InputProps {}

const ToggleButton = ({
  onClick,
  state
}: {
  onClick: VoidFunction;
  state: boolean;
}) => (
  <button
    className="typo-body-2xs text-link-blue border-none w-full h-full"
    type="button"
    onClick={onClick}
    aria-label={
      state
        ? "Vis adgangskode - bemærk, dette synliggøre din adgangskode"
        : "Skjul adgangskode"
    }
  >
    {state ? "Vis" : "Skjul"}
  </button>
);

export const PasswordField = (props: PasswordFieldProps) => {
  const [mask, setMask] = useState(true);

  return (
    <Input
      {...props}
      type={mask ? "password" : "text"}
      rightElement={
        <ToggleButton onClick={() => setMask((value) => !value)} state={mask} />
      }
    />
  );
};
