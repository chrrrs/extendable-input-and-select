import React, { PropsWithChildren, ReactElement, useCallback, useEffect, useRef } from 'react';

export interface ClickAwayListenerProps {
  onClickAway: () => void;
}

export const ClickAwayListener = (props: PropsWithChildren<ClickAwayListenerProps>) => {
  const { onClickAway, children } = props;
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback(
    (event: Event) => {
      const domNode = ref.current;

      if (!domNode || !domNode.contains(event.target as Element)) {
        onClickAway();
      }
    },
    [onClickAway]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return React.Children.only(
    React.cloneElement(children as ReactElement<any>, {
      ref,
      onClick: (event: MouseEvent) => handleClickOutside(event),
    })
  );
};
