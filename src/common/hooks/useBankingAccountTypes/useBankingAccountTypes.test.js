import { QueryClient, QueryClientProvider } from 'react-query';

import { renderHook, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useBankingAccountTypes } from './useBankingAccountTypes';

const bankingAccountTypes = [{ id: 'banking-account-type-id' }];

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const kyMock = {
  get: jest.fn(() => ({
    json: () => Promise.resolve({ bankingAccountTypes }),
  })),
};

describe('useBankingAccountTypes', () => {
  beforeEach(() => {
    kyMock.get.mockClear();
    useOkapiKy.mockClear().mockReturnValue(kyMock);
  });

  it('should fetch all banking account types', async () => {
    const { result } = renderHook(() => useBankingAccountTypes(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.bankingAccountTypes).toEqual(bankingAccountTypes);
  });
});
