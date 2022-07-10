import { useContext, useEffect, useState } from 'react';
import { StaticCommercialContext } from '..';
import { GoogleTag as GT } from '../types';

export type AdUnit = {
  adUnitPath: string;
  size: GT.GeneralSize;
  divId: string;
};

declare global {
  interface Window {
    googletag: any;
  }
}

type GoogleTagEvent = {
  isEmpty: boolean;
};

export type DFPProps = {
  path: string;
  id: string;
  size: GT.GeneralSize;
};

type GoogleTag = {
  cmd: GT.CommandArray;
  defineSlot: GT.defineSlot;
  pubads: GT.pubads;
  enableServices: GT.enableServices;
  display: GT.display;
  destroySlots: GT.destroySlots;
};

export function useDfpSlot({ adUnitPath, size, divId }: AdUnit) {
  const [readyToShow, setReadyToShow] = useState(false);

  const currentContextValue = useContext(StaticCommercialContext);

  useEffect(() => {
    const googletag: GoogleTag = window.googletag || { cmd: [] };
    googletag.cmd.push(() => {
      googletag.defineSlot(adUnitPath, size, divId)?.addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();

      if (currentContextValue?.ppid) {
        googletag.pubads().setPublisherProvidedId(currentContextValue.ppid);
      }
      googletag.enableServices();
    });

    googletag.cmd.push(() => googletag.display(divId));

    const currentAd = googletag.pubads();

    const slotRenderEnded = ({ isEmpty }: GoogleTagEvent) => {
      setReadyToShow(!isEmpty);
      currentAd.removeEventListener('slotRenderEnded', slotRenderEnded);
    };

    currentAd.addEventListener('slotRenderEnded', slotRenderEnded);

    return () => {
      googletag.cmd.push(() => {
        googletag.destroySlots();
      });
      currentAd.removeEventListener('slotRenderEnded', slotRenderEnded);
      setReadyToShow(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adUnitPath, divId, JSON.stringify(size)]);
  // https://stackoverflow.com/questions/59467758/passing-array-to-useeffect-dependency-list

  return readyToShow;
}
