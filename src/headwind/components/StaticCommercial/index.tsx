import { createContext, FunctionComponent, useMemo, useState } from 'react';
import { AD_PAUSE, MEDIA_PAUSE, MEDIA_PLAY, AD_PLAY } from '@tv2/unifiedplayer/src/core/events';
import { AdUnit, useDfpSlot } from './hooks';
import styles from './StaticCommercial.module.css';

export const StaticCommercialContext = createContext<{ ppid: string | null } | undefined>(
  undefined
);

type AdOverlayProps = {
  ad: AdUnit;
};

export type PlayerProps = {
  on: any;
};

type StaticCommercialProps = {
  player: PlayerProps;
  ad: AdUnit;
  ppid: string | null;
};

export const AdOverlay: FunctionComponent<AdOverlayProps> = ({ ad }) => {
  const readyToShowAd = useDfpSlot(ad);

  return (
    // FIXME: While we're testing the number of impressions, the overlay is always hidden
    // eslint-disable-next-line no-constant-condition
    <div className={`${styles.commercialOverlay} ${readyToShowAd && false ? styles.visible : ''}`}>
      <div className={styles.commercialWrapper}>
        <div key={ad.divId} className={styles.commercial} id={ad.divId} />
      </div>
      {/* FIXME: While we're testing the number of impressions, this is hidden */}
      {/* <small className={styles.commercialSmallText}>annonce</small> */}
    </div>
  );
};

export const StaticCommercial: FunctionComponent<StaticCommercialProps> = ({
  player,
  ad,
  ppid,
}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const memoizedContextValue = useMemo(() => ({ ppid }), [ppid]);

  player.on(MEDIA_PAUSE, () => {
    setShouldShow(true);
  });

  player.on(MEDIA_PLAY, () => {
    setShouldShow(false);
  });

  player.on(AD_PAUSE, () => {
    setShouldShow(false);
  });

  player.on(AD_PLAY, () => {
    setShouldShow(false);
  });

  if (!shouldShow) return null;

  return (
    <StaticCommercialContext.Provider value={memoizedContextValue}>
      <AdOverlay ad={ad} />;
    </StaticCommercialContext.Provider>
  );
};
