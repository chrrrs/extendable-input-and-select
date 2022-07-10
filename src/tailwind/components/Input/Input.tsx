// import getGuid from "@tv2/velour/libraries/guid";
import classNames from "classnames";
import React, {
  FC,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState
} from "react";
import { AlertOctagon } from "react-feather";
import { InputInfo } from "../../common/InputInfo";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: HTMLInputElement["value"];
  label: string;
  infoText?: string;
  hint?: string;
  errorText?: string;
  isInvalid?: boolean;
  submitted?: boolean;
  /** Add an additional ReactNode, placed in the right side of an input element (buttons, icons etc.)
   *
   * This will be placed in the right side of the input element, but before the infoText button.
   */
  rightElement?: ReactNode;
}

const Input: FC<InputProps> = (props) => {
  const {
    className,
    infoText,
    errorText,
    label,
    hint,
    onBlur,
    isInvalid,
    submitted,
    rightElement,
    ...rest
  } = props;
  const [id, setId] = useState<InputProps["id"]>(undefined);
  const [hasBeenBlurred, setHasBeenBlurred] = useState<boolean>(false);

  // useEffect(() => {
  //   setId(props.id || getGuid("input-guid"));
  // }, [props.id]);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setHasBeenBlurred(true);
    onBlur?.(event);
  };
  const showError = submitted
    ? isInvalid && errorText
    : isInvalid && errorText && hasBeenBlurred;

  // get the last occurence of paddingLeft on the input
  // this is used to determine the placement of the label
  // which is placed absolute and does not adhere to the paddingLeft of the input
  const inputPaddingLeft = className?.match(/pl(.*?) /g);
  const lastOccurenceOfInputPaddingLeft =
    inputPaddingLeft?.[(inputPaddingLeft ?? "").length - 1] ?? "";

  return (
    <label htmlFor={id} className="w-full">
      <input
        {...rest}
        id={id}
        aria-label={label}
        aria-invalid={isInvalid}
        onBlur={handleBlur}
        className={classNames(
          "block bg-white typo-body-m w-full box-border appearance-none h-12 rounded px-3 pt-4 pb-0 border border-solid border-grey-300",
          "focus:border-grey-900 focus-visible:outline-none empty:focus:placeholder:opacity-100 placeholder:opacity-0",
          className,
          styles.input,
          {
            "pr-10": infoText || rightElement,
            "pr-20": infoText && rightElement,
            "border-tv2-red": showError,
            [styles.empty]: !props.value
          }
        )}
      />

      <span
        className={classNames(
          "absolute top-1/4 left-0 text-grey-700 typo-body-m pointer-events-none",
          styles.label,
          {
            [lastOccurenceOfInputPaddingLeft]: true
          }
        )}
        data-label-hint={hint && ` - ${hint}`}
      >
        {label}
      </span>
    </label>
  );
};

Input.displayName = "Input";

export default Input;
