import * as React from 'react';
import classNames from 'classnames';
import Clickable from '@tv2/ui-ng/components/behaviors/Clickable';
import styles from './buttons.module.css';

export const colors = [
  'play-blue',
  'cta-green',
  'link-blue',
  'tv2-sport',
  'tv2-vejret',
  'tvtid',
  'grey-900',
  'white',
  'green',
  'playblue',
  'orange',
  'transparent',
] as const;

export type ButtonColor = typeof colors[number];
export const types = ['primary', 'secondary', 'flat'] as const;
export type Type = typeof types[number];

export type ButtonProps = React.PropsWithChildren<{
  url?: string;
  disabled?: boolean;
  size?: 'small' | 'large';
  type?: Type;
  color?: ButtonColor;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  submit?: boolean;
  icon?: React.FunctionComponent<{ className?: string }>;
  iconPosition?: 'right' | 'left';
  hexColor?: string;
  hexBackgroundColor?: string;
  className?: string;
  title?: string;
  'data-testid'?: string;
  'aria-describedby'?: string;
}>;

const Button: React.FunctionComponent<ButtonProps> = ({
  disabled = false,
  type = 'primary',
  color = 'play-blue',
  hexColor,
  hexBackgroundColor,
  size,
  icon: IconComponent,
  iconPosition = 'right',
  submit = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  url,
  className,
  title,
  'data-testid': data_test_id,
  'aria-describedby': aria_describedby,
  ...rest
}) => {
  const isIconRight: boolean = iconPosition === 'right';
  const hasIcon: boolean = IconComponent !== undefined;
  const sizeTypeSet = size || 'responsive';
  const icon = hasIcon && IconComponent && (
    <IconComponent className={`${styles[iconPosition]} h-[24px] w-[24px]`} />
  );

  const buttonType = submit ? 'submit' : 'button';
  const customColors: Record<string, string> = {
    color: hexColor ?? '',
    backgroundColor: hexBackgroundColor ?? '',
  };
  const style = Object.keys(customColors).reduce((result, key) => {
    if (customColors[key]) {
      return {
        ...result,
        [key]: customColors[key],
      };
    }
    return result;
  }, {});

  const colorBackwardCompatibility = translateOldColors(color);

  return (
    <Clickable
      data-testid={data_test_id}
      aria-describedby={aria_describedby}
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      url={url}
      title={title}
      className={classNames(
        styles.button,
        className,
        {
          [styles.disabled]: disabled,
          [styles.hasIcon]: hasIcon,
        },
        styles[type],
        styles[colorBackwardCompatibility],
        styles[sizeTypeSet],
        styles[iconPosition]
      )}
      style={style}
      {...rest}
    >
      {!isIconRight && hasIcon && icon}
      {children}
      {isIconRight && hasIcon && icon}
    </Clickable>
  );
};

export default Button;

function translateOldColors(color: string) {
  switch (color) {
    case 'green':
      return 'cta-green';
    case 'playblue':
      return 'play-blue';
    case 'orange':
      return 'tvtid';
    default:
      return color;
  }
}
