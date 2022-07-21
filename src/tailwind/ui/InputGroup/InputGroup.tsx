import React, { cloneElement, forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames";
import { getValidChildren } from "../../utilities/getValidChildren";

export interface InputGroupProps extends InputHTMLAttributes<HTMLDivElement> {}
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    const validChildren = getValidChildren(children);
    const groupStyles: Record<string, boolean> = {};

    validChildren.forEach((child: any) => {
      if (child.type.displayName === "InputLeftElement") {
        groupStyles["pl-12"] = true;
      }

      if (child.type.displayName === "InputRightElement") {
        groupStyles["pr-12"] = true;
      }
    });

    const setPlacement = (child: any) => {
      switch (child.type.displayName) {
        case "InputLeftElement":
          return "left-0";
        case "InputRightElement":
          return "right-0";
        default:
          return "";
      }
    };

    const clones = validChildren.map((child: any) => {
      switch (child.type.displayName) {
        case "InputElement":
        case "SelectElement":
          return cloneElement(child, {
            ...child.props,
            className: classNames(groupStyles, child.props.className, "w-full")
          });
        default:
          return cloneElement(child, {
            ...child.props,
            className: classNames(
              "absolute flex justify-center items-center w-12 h-12",
              setPlacement(child),
              child.props.className
            )
          });
      }

      // return child.type.displayName !== "InputElement"
      //   ? cloneElement(child, {
      //       ...child.props,
      //       className: classNames(
      //         "absolute flex justify-center items-center w-12 h-12",
      //         setPlacement(child),
      //         child.props.className
      //       )
      //     })
      //   : cloneElement(child, {
      //       ...child.props,
      //       className: classNames(groupStyles, child.props.className, "w-full")
      //     });
    });

    return (
      <div
        {...rest}
        ref={ref}
        className={classNames("w-full flex relative items-center", className)}
      >
        {clones}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";

// Generic InputPlacementElement
// used by the input placement components below
export interface InputPlacementElementProps
  extends InputHTMLAttributes<HTMLDivElement> {}
export const InputPlacementElement = forwardRef<
  HTMLDivElement,
  InputPlacementElementProps
>((props, ref) => {
  return <div ref={ref} {...props} />;
});

export interface InputLeftElementProps extends InputPlacementElementProps {}
export const InputLeftElement = forwardRef<
  HTMLDivElement,
  InputLeftElementProps
>((props, ref) => {
  return <InputPlacementElement ref={ref} {...props} />;
});

// This is used in `InputGroup.tsx`
InputLeftElement.displayName = "InputLeftElement";

export interface InputRightElementProps extends InputPlacementElementProps {}
export const InputRightElement = forwardRef<
  HTMLDivElement,
  InputRightElementProps
>((props, ref) => {
  return <InputPlacementElement ref={ref} {...props} />;
});

// This is used in `InputGroup.tsx`
InputRightElement.displayName = "InputRightElement";
