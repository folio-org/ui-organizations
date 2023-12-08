import { QueryClient, QueryClientProvider } from 'react-query';

import { renderHook, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { organization } from 'fixtures';
import { useOrganizationBankingInformation } from './useOrganizationBankingInformation';

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const organizationId = organization.id;
const bankingInformation = [
  { id: 'id', organizationId },
];

const kyMock = {
  get: jest.fn(() => ({
    json: () => Promise.resolve({ bankingInformation }),
  })),
};

describe('useOrganizationBankingInformation', () => {
  beforeEach(() => {
    kyMock.get.mockClear();
    useOkapiKy
      .mockClear()
      .mockReturnValue(kyMock);
  });

  it('should fetch organization banking information', async () => {
    const { result } = renderHook(() => useOrganizationBankingInformation(organizationId), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.bankingInformation).toEqual(bankingInformation);
  });
});
