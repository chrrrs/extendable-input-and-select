import classNames from "classnames";
import React, {
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useState
} from "react";
import styles from "./InputElement.module.css";

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: HTMLInputElement["value"];
  label: string;
  hint?: string;
  isInvalid?: boolean;
  submitted?: boolean;
}

export const InputElement = forwardRef<HTMLInputElement, InputElementProps>(
  (props, ref) => {
    const {
      className,
      label,
      hint,
      onBlur,
      isInvalid,
      submitted,
      ...rest
    } = props;
    const [id, setId] = useState<InputElementProps["id"]>(undefined);
    const [hasBeenBlurred, setHasBeenBlurred] = useState<boolean>(false);

    // useEffect(() => {
    //   setId(props.id || getGuid("input-guid"));
    // }, [props.id]);

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setHasBeenBlurred(true);
      onBlur?.(event);
    };
    const showError = !submitted ? isInvalid : isInvalid && hasBeenBlurred;

    // get the last occurence of paddingLeft on the input
    // this is used to determine the placement of the label
    // which is placed absolute and does not adhere to the paddingLeft of the input
    const inputPaddingLeft = className?.match(/pl(.*?) /g);
    const lastOccurenceOfInputPaddingLeft =
      inputPaddingLeft?.[(inputPaddingLeft ?? "").length - 1] ?? "pl-3";

    return (
      <label htmlFor={id} className="w-full">
        <input
          {...rest}
          ref={ref}
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
  }
);

InputElement.displayName = "InputElement";
