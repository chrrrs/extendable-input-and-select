import React, {
  FC,
  FocusEvent,
  SelectHTMLAttributes,
  useEffect,
  useState
} from "react";
// import getGuid from "@tv2/velour/libraries/guid";
import classNames from "classnames";
import { AlertOctagon, ChevronDown } from "react-feather";
import { InputInfo } from "../../common/InputInfo/InputInfo";
import styles from "./Select.module.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  value: HTMLSelectElement["value"];
  label: string;
  infoText?: string;
  hint?: string;
  errorText?: string;
  isInvalid?: boolean;
  options: string[];
}

const Select: FC<SelectProps> = (props) => {
  const {
    hint,
    label,
    className,
    infoText,
    isInvalid,
    errorText,
    onBlur,
    options,
    ...rest
  } = props;
  const [id, setId] = useState<SelectProps["id"]>(undefined);
  const [hasBeenBlurred, setHasBeenBlurred] = useState<boolean>(false);

  // useEffect(() => {
  //   setId(props.id || getGuid("select-guid"));
  // }, [props.id]);

  const handleBlur = (event: FocusEvent<HTMLSelectElement>) => {
    setHasBeenBlurred(true);
    onBlur?.(event);
  };

  const showError = isInvalid && errorText && hasBeenBlurred;

  return (
    <div>
      <div className="relative flex justify-center items-center">
        <select
          {...rest}
          id={id}
          aria-label={label}
          aria-invalid={isInvalid}
          className={classNames(
            "block bg-white typo-body-m w-full box-border appearance-none h-12 rounded px-3 pt-4 pb-0 border border-solid border-grey-300",
            "focus:border-grey-900 focus-visible:outline-none empty:focus:placeholder:opacity-100 placeholder:opacity-0",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            className,
            styles.input,
            {
              "pr-20": infoText,
              "pr-12": !infoText,
              "border-tv2-red": showError,
              [styles.empty]: !props.value
            }
          )}
          onBlur={handleBlur}
        >
          <option value="" hidden>
            {" "}
          </option>
          {options.map((option) => (
            <option key={`option_${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label
          htmlFor={id}
          className={classNames(
            "absolute top-1/4 left-3 text-grey-700 typo-body-m pointer-events-none",
            styles.label
          )}
          data-label-hint={hint && ` - ${hint}`}
        >
          {label}
        </label>

        <div
          className={classNames("absolute right-0 pointer-events-none", {
            "pr-12": infoText,
            "pr-4 ": !infoText
          })}
        >
          <ChevronDown />
        </div>

        {infoText && (
          <div className="absolute right-0 pr-3">
            <InputInfo text={infoText} />
          </div>
        )}
      </div>
      {showError && (
        <div
          className="absolute flex items-center pt-1 gap-1"
          role="alert"
          aria-live="assertive"
        >
          <AlertOctagon />
          <p className="text-tv2-red typo-body-xs">{errorText}</p>
        </div>
      )}
    </div>
  );
};

export default Select;
