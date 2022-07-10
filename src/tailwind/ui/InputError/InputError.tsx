import React from "react";
import { AlertOctagon } from "react-feather";

export interface InputErrorProps {
  text?: string;
}

export const InputError = (props: InputErrorProps) => {
  const { text } = props;

  return (
    <div
      className="absolute pt-1 flex items-center pt-1 gap-1"
      role="alert"
      aria-live="assertive"
    >
      <AlertOctagon className="w-4 text-tv2-red" />
      <p className="text-tv2-red typo-body-xs">{text}</p>
    </div>
  );
};
