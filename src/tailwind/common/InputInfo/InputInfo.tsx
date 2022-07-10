import React, { FC, useState } from 'react';
import { Information } from '@tv2/ui-icons/components/group/Primary';
import { ClickAwayListener } from '../../utilities/ClickAwayListener';

export interface InputInfoProps {
  text: string;
}

export const InputInfo: FC<InputInfoProps> = props => {
  const { text } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="relative h-full w-full">
      <ClickAwayListener onClickAway={() => setIsVisible(false)}>
        <div>
          <button
            type="button"
            aria-label="info"
            className="cursor-pointer border-none"
            onClick={() => setIsVisible(!isVisible)}
          >
            <Information />
          </button>
          {isVisible && (
            <div
              className="bg-white p-4 typo-body-xs absolute top-[25px] right-[-10px] w-[250px] block drop-shadow-2xl rounded z-10"
              role="alert"
            >
              <b>Hvorfor?</b> {text}
            </div>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};
