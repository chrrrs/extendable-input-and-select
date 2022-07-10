import { renderHook, act as hookAct } from '@testing-library/react-hooks/pure';
import { AdUnit, useDfpSlot } from './useDfpSlot';
import { StaticCommercialContext } from '../index';

const testAdUnit: AdUnit = {
  adUnitPath: 'path',
  size: [
    [1, 1],
    [800, 450],
  ],
  divId: 'div-id',
};

describe(useDfpSlot, () => {
  let windowSpy;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
    jest.clearAllMocks();
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  const mockPush = jest.fn();
  const mockDefineSlot = jest.fn();
  const mockEnableSingleRequest = jest.fn();
  const mockSetPublisherProvidedId = jest.fn();
  const mockPubadsAddEventListener = jest.fn();
  const mockPubadsRemoveEventListener = jest.fn();
  const mockDestroySlots = jest.fn();
  const mockPubads = jest.fn(() => ({
    enableSingleRequest: mockEnableSingleRequest,
    setPublisherProvidedId: mockSetPublisherProvidedId,
    addEventListener: mockPubadsAddEventListener,
    removeEventListener: mockPubadsRemoveEventListener,
  }));
  const mockEnableServices = jest.fn();
  const mockDisplay = jest.fn();
  const googletag = {
    cmd: {
      push: mockPush,
    },
    defineSlot: mockDefineSlot,
    pubads: mockPubads,
    enableServices: mockEnableServices,
    display: mockDisplay,
    destroySlots: mockDestroySlots,
  };

  it('prepares the googletag for ads', () => {
    windowSpy.mockImplementation(() => ({
      googletag,
      addEventListener: jest.fn(), // these are needed by window
      removeEventListener: jest.fn(), // these are needed by window
    }));

    renderHook(() => useDfpSlot(testAdUnit));

    expect(mockDefineSlot).not.toHaveBeenCalled();
    expect(mockEnableSingleRequest).not.toHaveBeenCalled();
    expect(mockEnableServices).not.toHaveBeenCalled();

    const pushedMethods = mockPush.mock.calls;
    pushedMethods[0][0]();

    expect(mockDefineSlot).toHaveBeenCalledWith(
      testAdUnit.adUnitPath,
      testAdUnit.size,
      testAdUnit.divId
    );
    expect(mockEnableSingleRequest).toHaveBeenCalled();
    expect(mockEnableServices).toHaveBeenCalled();

    expect(mockDisplay).not.toHaveBeenCalled();

    pushedMethods[1][0]();

    expect(mockDisplay).toHaveBeenCalledWith(testAdUnit.divId);
  });

  describe('when ppid is set', () => {
    it('calls setPublisherProvidedId', () => {
      windowSpy.mockImplementation(() => ({
        googletag,
        addEventListener: jest.fn(), // these are needed by window
        removeEventListener: jest.fn(), // these are needed by window
      }));
      const ppid = 'some-ppid-1234';

      renderHook<any, any>(() => useDfpSlot(testAdUnit), {
        wrapper: ({ children }) => (
          // eslint-disable-next-line
          <StaticCommercialContext.Provider value={{ ppid }}>
            {children}
          </StaticCommercialContext.Provider>
        ),
      });

      expect(mockSetPublisherProvidedId).not.toHaveBeenCalled();

      const pushedMethods = mockPush.mock.calls;
      pushedMethods[0][0]();

      expect(mockSetPublisherProvidedId).toHaveBeenCalledWith(ppid);
    });
  });

  describe('when ppid is null', () => {
    it('does not call setPublisherProvidedId', () => {
      windowSpy.mockImplementation(() => ({
        googletag,
        addEventListener: jest.fn(), // these are needed by window
        removeEventListener: jest.fn(), // these are needed by window
      }));

      renderHook<any, any>(() => useDfpSlot(testAdUnit), {
        wrapper: ({ children }) => (
          // eslint-disable-next-line
          <StaticCommercialContext.Provider value={{ ppid: null }}>
            {children}
          </StaticCommercialContext.Provider>
        ),
      });

      expect(mockSetPublisherProvidedId).not.toHaveBeenCalled();

      const pushedMethods = mockPush.mock.calls;
      pushedMethods[0][0]();

      expect(mockSetPublisherProvidedId).not.toHaveBeenCalled();
    });
  });

  describe('when slotRenderEnded is called', () => {
    it('sets readyToShow as the opposite of isEmpty', () => {
      windowSpy.mockImplementation(() => ({
        googletag,
        addEventListener: jest.fn(), // these are needed by window
        removeEventListener: jest.fn(), // these are needed by window
      }));

      const { result } = renderHook(() => useDfpSlot(testAdUnit));

      expect(result.current).toBeFalsy();

      const [eventName, handler] = mockPubadsAddEventListener.mock.calls[0];
      expect(eventName).toBe('slotRenderEnded');

      hookAct(() => {
        handler({ isEmpty: false });
      });
      expect(mockPubadsRemoveEventListener).toHaveBeenCalledWith(
        'slotRenderEnded',
        expect.anything()
      );

      expect(result.current).toBeTruthy();
    });
  });

  describe('when hook unmounts', () => {
    it('destroys slots', async () => {
      windowSpy.mockImplementation(() => ({
        googletag,
        addEventListener: jest.fn(), // these are needed by window
        removeEventListener: jest.fn(), // these are needed by window
      }));

      const { result, unmount } = renderHook(() => useDfpSlot(testAdUnit));

      expect(result.current).toBeFalsy();

      const [, handler] = mockPubadsAddEventListener.mock.calls[0];

      hookAct(() => {
        handler({ isEmpty: false });
      });

      expect(mockPush.mock.calls).toHaveLength(2);

      hookAct(() => {
        unmount();
      });

      mockPush.mock.calls[2][0]();
      expect(mockDestroySlots).toHaveBeenCalled();
    });
  });
});
