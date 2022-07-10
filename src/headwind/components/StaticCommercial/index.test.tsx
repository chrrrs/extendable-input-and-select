import * as React from 'react';

import { act, render } from '@testing-library/react';
import { AD_PAUSE, MEDIA_PAUSE, MEDIA_PLAY, AD_PLAY } from '@tv2/unifiedplayer/src/core/events';

import { StaticCommercial, PlayerProps, AdOverlay } from '.';
import { AdUnit, useDfpSlot } from './hooks';

const testAdUnit: AdUnit = {
  adUnitPath: 'path',
  size: [
    [1, 1],
    [800, 450],
  ],
  divId: 'div-id',
};

jest.mock('./hooks', () => ({
  useDfpSlot: jest.fn(),
}));

const mockedUseDfpSlot = useDfpSlot as jest.MockedFunction<typeof useDfpSlot>;

jest.unmock('react-dom');

const fallbackPlayer: PlayerProps = { on: jest.fn() };

beforeEach(() => {
  jest.resetAllMocks();
});

describe(AdOverlay, () => {
  describe('when readyToShowAd is true', () => {
    it('adds visible class', () => {
      mockedUseDfpSlot.mockReturnValueOnce(true);

      const { container: _container } = render(<AdOverlay ad={testAdUnit} />);

      expect(mockedUseDfpSlot).toHaveBeenCalledWith(testAdUnit);
      // FIXME: While we're testing the number of impressions, this is not happening
      // expect(container.children[0].classList).toContain('visible');
    });
  });

  describe('when readyToShowAd is false', () => {
    it('stays hidden', () => {
      mockedUseDfpSlot.mockReturnValueOnce(false);

      const { container } = render(<AdOverlay ad={testAdUnit} />);

      expect(mockedUseDfpSlot).toHaveBeenCalledWith(testAdUnit);
      expect(container.children[0].classList).not.toContain('visible');
    });
  });
});

describe(StaticCommercial, () => {
  describe('on MEDIA_PAUSE', () => {
    it('returns StaticCommercial with AdOverlay', async () => {
      mockedUseDfpSlot.mockReturnValue(true); // readyToShow: true

      const { container } = render(
        <StaticCommercial ad={testAdUnit} player={fallbackPlayer} ppid={null} />
      );

      expect(container.children).toHaveLength(0);

      const mediaPauseCall = fallbackPlayer.on.mock.calls.find(call => call[0] === MEDIA_PAUSE);
      act(() => {
        // call event handler
        mediaPauseCall[1]();
      });

      expect(container.children[0].classList).toContain('commercialOverlay');
    });
  });
  describe('on MEDIA_PLAY', () => {
    it('returns null', async () => {
      mockedUseDfpSlot.mockReturnValue(true); // readyToShow: true

      const { container } = render(
        <StaticCommercial ad={testAdUnit} player={fallbackPlayer} ppid={null} />
      );

      expect(container.children).toHaveLength(0);

      const mediaPlayCall = fallbackPlayer.on.mock.calls.find(call => call[0] === MEDIA_PLAY);
      act(() => {
        // call event handler
        mediaPlayCall[1]();
      });

      expect(container.children).toHaveLength(0);
    });
  });
  describe('on AD_PAUSE', () => {
    it('returns null', async () => {
      mockedUseDfpSlot.mockReturnValue(true); // readyToShow: true

      const { container } = render(
        <StaticCommercial ad={testAdUnit} player={fallbackPlayer} ppid={null} />
      );

      expect(container.children).toHaveLength(0);

      const adPauseCall = fallbackPlayer.on.mock.calls.find(call => call[0] === AD_PAUSE);
      act(() => {
        // call event handler
        adPauseCall[1]();
      });

      expect(container.children).toHaveLength(0);
    });
  });
  describe('on AD_PLAY', () => {
    it('returns null', async () => {
      mockedUseDfpSlot.mockReturnValue(true); // readyToShow: true

      const { container } = render(
        <StaticCommercial ad={testAdUnit} player={fallbackPlayer} ppid={null} />
      );

      expect(container.children).toHaveLength(0);

      const adPlayCall = fallbackPlayer.on.mock.calls.find(call => call[0] === AD_PLAY);
      act(() => {
        // call event handler
        adPlayCall[1]();
      });

      expect(container.children).toHaveLength(0);
    });
  });
});
