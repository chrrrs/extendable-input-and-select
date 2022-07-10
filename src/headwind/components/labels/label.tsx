import { FunctionComponent } from 'react';
import styles from './label.module.css';

type Size = 'medium' | 'large' | 'xlarge';
type Type = 'primary' | 'secondary';
export type Color = 'yellow' | 'red' | 'play' | 'black' | 'white';

type LabelProps = {
  text: string;
  color?: Color;
  type?: Type;
} & (
  | {
      size?: never;
      responsive: boolean;
    }
  | {
      size: Size;
      responsive?: never;
    }
);

const backgroundColors = {
  primary: {
    red: 'bg-tv2-red',
    play: 'bg-play-blue',
    yellow: 'bg-yellow',
    black: 'bg-black',
    white: 'bg-white',
  },
  secondary: {
    red: '',
    play: '',
    yellow: '',
    black: '',
    white: '',
  },
} as const;

const textColors = {
  primary: {
    red: 'text-white',
    play: 'text-white',
    yellow: 'text-black',
    black: 'text-white',
    white: 'text-black',
  },
  secondary: {
    red: 'text-tv2-red',
    play: 'text-play-blue',
    yellow: 'text-yellow',
    black: 'text-black',
    white: 'text-white',
  },
} as const;

const fontSizes = {
  primary: {
    medium: '10px',
    large: '12px',
    xlarge: '16px',
  },
  secondary: {
    medium: '12px',
    large: '14px',
    xlarge: '18px',
  },
} as const;

const heights = {
  medium: '20px',
  large: '24px',
  xlarge: '32px',
} as const;

const paddings = {
  primary: {
    medium: 'px-2',
    large: 'px-3',
    xlarge: 'px-4',
  },
  secondary: {
    medium: '',
    large: '',
    xlarge: '',
  },
} as const;

const lineHeights = {
  medium: '23px',
  large: '27px',
  xlarge: '32px',
} as const;

const Label: FunctionComponent<LabelProps> = ({
  type = 'primary',
  size = 'medium',
  color = 'play',
  text,
  responsive,
}) => {
  const bg = type === 'primary' ? backgroundColors.primary?.[color] : '';
  const textColor = textColors[type]?.[color];
  const fontSize = fontSizes[type]?.[size];
  const paddingX = responsive ? '' : paddings[type]?.[size];
  const height = heights[size];
  const lineHeight = lineHeights[size];

  const style = responsive ? {} : { lineHeight, height, fontSize };

  return (
    <div className="flex">
      <div className={`${paddingX} ${bg}`}>
        <div className={`font-black italic ${textColor}`} style={style}>
          <div
            className={
              responsive ? (type === 'primary' ? styles.primary : styles.secondary) : undefined
            }
          >
            {text.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Label;
