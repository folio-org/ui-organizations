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

const mockKy = {
  get: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({
      items: [{ value: 'useGenerator' }],
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
    expect(result.current.isUseGenerator).toBe(false);
    expect(result.current.isUseTextField).toBe(false);
    expect(result.current.isUseBoth).toBe(false);
    expect(result.current.enabled).toBe(false);
  });
});
