import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

import { useVendorCodeGeneratorSettings } from './useVendorCodeGeneratorSettings';
import {
  VENDOR_CODE_GENERATOR_OPTIONS,
  VENDOR_CODE_GENERATOR_SETTINGS_KEY,
} from '../../constants';

const settingsEntity = {
  id: '3297a4ed-2071-4455-8874-23ff88029490',
  key: VENDOR_CODE_GENERATOR_SETTINGS_KEY,
  value: VENDOR_CODE_GENERATOR_OPTIONS.GENERATOR,
};

const mockKy = {
  get: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({
      settings: [settingsEntity],
    })),
  })),
};

const mockStripes = {
  hasInterface: jest.fn(() => true),
};

const queryClient = new QueryClient();
const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe('useVendorCodeGeneratorSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
    useOkapiKy.mockReturnValue(mockKy);
    useStripes.mockReturnValue(mockStripes);
  });

  it('should return correct values', async () => {
    const { result } = renderHook(() => useVendorCodeGeneratorSettings(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(mockKy.get).toHaveBeenCalled();
    expect(result.current.vendorCodeSetting).toEqual(settingsEntity);
    expect(result.current.isUseGenerator).toBe(true);
    expect(result.current.isUseTextField).toBe(false);
    expect(result.current.isUseBoth).toBe(false);
    expect(result.current.enabled).toBe(true);
  });

  it('should return enabled=false if interface not present', async () => {
    mockStripes.hasInterface.mockImplementationOnce(() => false);
    const { result } = renderHook(() => useVendorCodeGeneratorSettings(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(mockKy.get).not.toHaveBeenCalled();
    expect(result.current.vendorCodeSetting).toBeUndefined();
    expect(result.current.isUseGenerator).toBe(false);
    expect(result.current.isUseTextField).toBe(false);
    expect(result.current.isUseBoth).toBe(false);
    expect(result.current.enabled).toBe(false);
  });
});
