import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { BANKING_INFORMATION_ENABLED_KEY } from '../../constants';
import { useBankingInformationSettings } from './useBankingInformationSettings';

const queryClient = new QueryClient();

const MOCK_BANKING_INFORMATION = {
  id: 'cb007def-4b68-496c-ad78-ea8e039e819d',
  key: BANKING_INFORMATION_ENABLED_KEY,
  value: 'true',
  refetch: jest.fn(),
};

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useBankingInformationSettings', () => {
  beforeEach(() => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => Promise.resolve({ settings: [MOCK_BANKING_INFORMATION] }),
        }),
      });
  });

  it('should fetch banking information settings', async () => {
    const { result } = renderHook(() => useBankingInformationSettings(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current).toEqual(expect.objectContaining({
      enabled: true,
      isLoading: false,
      bankingInformation: MOCK_BANKING_INFORMATION,
    }));
  });
});
