import { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import classNames from 'classnames';

import styles from './stories.module.css';

type Typo = {
  ClassName: string;
  Style: string;
  Size: string;
};

type CreateRowProp = {
  rowId: number;
  className: string;
  style: string;
  size: string;
  children?: React.ReactNode;
};

type ComputedStyles = {
  Weight?: string;
  PX?: string;
  LineHeight?: string;
};

const typoes: Typo[] = [
  {
    ClassName: 'headline3XL',
    Style: 'Headline 3XL',
    Size: '3XL',
  },
  {
    ClassName: 'headline2XL',
    Style: 'Headline 2XL',
    Size: '2XL',
  },
  {
    ClassName: 'headlineXL',
    Style: 'Headline XL',
    Size: 'XL',
  },
  {
    ClassName: 'headlineL',
    Style: 'Headline L',
    Size: 'L',
  },
  {
    ClassName: 'headlineM',
    Style: 'Headline M',
    Size: 'M',
  },
  {
    ClassName: 'bodyM',
    Style: 'Body M',
    Size: 'M',
  },
  {
    ClassName: 'bodyS',
    Style: 'Body S',
    Size: 'S',
  },
  {
    ClassName: 'bodyXS',
    Style: 'Body XS',
    Size: 'XS',
  },
  {
    ClassName: 'body2XS',
    Style: 'Body 2XS',
    Size: '2XS',
  },
  {
    ClassName: 'search',
    Style: 'Search',
    Size: 'XL',
  },
  {
    ClassName: 'buttonText',
    Style: 'Button text',
    Size: 'M',
  },
  {
    ClassName: 'navigation',
    Style: 'navigation',
    Size: 'XS',
  },
];

function typeWeightsToString(weight: number): string {
  switch (weight) {
    case 900:
      return 'Black';
    case 700:
      return 'Bold';
    case 500:
      return 'Medium';
    case 400:
      return 'Regular';
    case 300:
      return 'Light';
  }

  return String(weight);
}

const CreateRow: React.FunctionComponent<CreateRowProp> = ({
  rowId,
  className,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [computedStyles, setComputedStyles] = useState<ComputedStyles>({});

  useEffect(() => {
    {
      if (!ref.current) return;
      const cs = window.getComputedStyle(ref.current);
      setComputedStyles({
        PX: cs.fontSize,
        Weight: cs.fontWeight,
        LineHeight: cs.lineHeight,
      });
    }
    const subscription = fromEvent(window, 'resize')
      .pipe(throttleTime(1000))
      .subscribe(value => {
        const cs = window.getComputedStyle(ref.current);
        setComputedStyles({
          PX: cs.fontSize,
          Weight: cs.fontWeight,
          LineHeight: cs.lineHeight,
        });
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  // add resize to dependency

  const rowIndex = rowId + 2;

  return (
    <>
      <div
        ref={ref}
        style={{ gridColumnStart: 1, gridRowStart: rowIndex }}
        className={classNames(className, styles.tableRow)}
      >
        {style}
      </div>
      <div style={{ gridColumnStart: 2, gridRowStart: rowIndex }} className={styles.tableRow}>
        {typeWeightsToString(Number(computedStyles.Weight))}
      </div>
      <div style={{ gridColumnStart: 3, gridRowStart: rowIndex }} className={styles.tableRow}>
        {computedStyles.PX}
      </div>
      <div style={{ gridColumnStart: 4, gridRowStart: rowIndex }} className={styles.tableRow}>
        {computedStyles.LineHeight}
      </div>
      <div style={{ gridColumnStart: 5, gridRowStart: rowIndex }} className={styles.tableRow}>
        {props.size}
      </div>
    </>
  );
};

const headlineSwitch = px => {
  return px >= 1024 ? (px < 1920 ? 'Large' : 'TV') : px <= 479 ? 'Small' : 'Medium';
};

export const Design = () => {
  const [headline, setHeadline] = useState<string>('');

  useEffect(() => {
    const subscription = fromEvent(window, 'resize')
      .pipe(throttleTime(500))
      .subscribe(value => {
        setHeadline(headlineSwitch(window.innerWidth));
      });
    setHeadline(headlineSwitch(window.innerWidth));

    return () => {
      subscription.unsubscribe();
    };
  }, [setHeadline]);

  return (
    <div className={styles.container}>
      <h1 className="headline-2xl">{headline} usage scale</h1>
      <div className={styles.table}>
        <div style={{ gridColumnStart: 1, gridRowStart: 1 }} className={styles.tableRowHead}>
          Styles
        </div>
        <div style={{ gridColumnStart: 2, gridRowStart: 1 }} className={styles.tableRowHead}>
          Weight
        </div>
        <div style={{ gridColumnStart: 3, gridRowStart: 1 }} className={styles.tableRowHead}>
          px
        </div>
        <div style={{ gridColumnStart: 4, gridRowStart: 1 }} className={styles.tableRowHead}>
          Line height
        </div>
        <div style={{ gridColumnStart: 5, gridRowStart: 1 }} className={styles.tableRowHead}>
          Size class
        </div>
        {typoes.map((x, index) => (
          <CreateRow
            key={x.ClassName}
            rowId={index}
            className={x.ClassName}
            style={x.Style}
            size={x.Size}
          />
        ))}
      </div>
    </div>
  );
};

Design.story = {
  name: 'Usage scales',
  // parameters: {
  //   site: 'Styles',
  // },
};
