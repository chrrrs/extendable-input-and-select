import React, { FC, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Input as Test } from '../../components/Input';

export interface InputProps {}

export const Input: FC<InputProps> = props => {
  return (
    <InputGroup>
      <InputLeftElement>L</InputLeftElement>
      <Test value="" label="Firstname" {...props} />
      <InputRightElement>R</InputRightElement>
    </InputGroup>
  );
};

interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {}
export const InputElement = forwardRef<HTMLInputElement, InputElementProps>((props, ref) => {
  const { className, ...rest } = props;

  return <input {...rest} className={classNames('pt-4 pb-1', className)} ref={ref} />;
});

InputElement.displayName = 'Input';

interface InputGroupProps extends InputHTMLAttributes<HTMLDivElement> {}
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const validChildren = getValidChildren(children);
  const groupStyles = {};

  validChildren.forEach((child: any) => {
    if (child.type.displayName === 'InputLeftElement') {
      groupStyles['pl-12'] = true;
    }

    if (child.type.displayName === 'InputRightElement') {
      groupStyles['pr-12'] = true;
    }
  });

  const setPlacement = (child: any) => {
    switch (child.type.displayName) {
      case 'InputLeftElement':
        return 'left-0';
      case 'InputRightElement':
        return 'right-0';
      default:
        return '';
    }
  };

  const clones = validChildren.map((child: any) => {
    return child.type.displayName !== 'Input'
      ? React.cloneElement(child, {
          ...child.props,
          className: classNames(
            'absolute flex justify-center items-center w-12 h-12',
            setPlacement(child),
            child.props.className
          ),
        })
      : React.cloneElement(child, {
          ...child.props,
          className: classNames(groupStyles, child.props.className, 'w-full'),
        });
  });

  return (
    <div {...rest} ref={ref} className={classNames('w-full flex relative items-center', className)}>
      {clones}
    </div>
  );
});

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  ) as React.ReactChild[];
}

interface InputLeftElementProps extends InputHTMLAttributes<HTMLDivElement> {}
export const InputLeftElement = forwardRef<HTMLDivElement, InputLeftElementProps>((props, ref) => {
  const { className, ...rest } = props;

  return <div ref={ref} className={className} {...rest} />;
});

// This is used in `input-group.tsx`
InputLeftElement.displayName = 'InputLeftElement';

interface InputRightElementProps extends InputHTMLAttributes<HTMLDivElement> {}
export const InputRightElement = forwardRef<HTMLDivElement, InputRightElementProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <div ref={ref} className={className} {...rest} />;
  }
);

// This is used in `input-group.tsx`
InputRightElement.displayName = 'InputRightElement';
