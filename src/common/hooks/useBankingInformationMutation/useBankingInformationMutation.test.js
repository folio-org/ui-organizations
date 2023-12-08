import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import { useOkapiKy } from '@folio/stripes/core';

import { BANKING_INFORMATION_API } from '../../constants';
import { useBankingInformationMutation } from './useBankingInformationMutation';

const bankingInformationBase = {
  isPrimary: true,
  organizationId: 'organizationId',
  bankName: 'Bank name',
};

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const buildMockRequest = (response) => () => ({
  json: () => Promise.resolve(response),
});

const kyMock = {
  post: jest.fn((_, { json }) => buildMockRequest(json)()),
  put: jest.fn(buildMockRequest()),
  delete: jest.fn(buildMockRequest()),
};

const bankingInformationId = 'banking-information-id';

describe('useBankingInformationMutation', () => {
  beforeEach(() => {
    Object
      .values(kyMock)
      .forEach(fn => fn.mockClear());
    useOkapiKy
      .mockClear()
      .mockReturnValue(kyMock);
  });

  it('should make POST request to create a new banking information', async () => {
    const { result } = renderHook(
      () => useBankingInformationMutation(),
      { wrapper },
    );

    await result.current.createBankingInformation({ bankingInformation: bankingInformationBase });

    expect(kyMock.post).toHaveBeenCalledWith(BANKING_INFORMATION_API, { json: bankingInformationBase });
  });

  it('should make PUT request to update an banking information', async () => {
    const bankingInformation = {
      ...bankingInformationBase,
      id: bankingInformationId,
      bankName: 'New bank name',
    };

    const { result } = renderHook(
      () => useBankingInformationMutation(),
      { wrapper },
    );

    await result.current.updateBankingInformation({ bankingInformation });

    expect(kyMock.put).toHaveBeenCalledWith(`${BANKING_INFORMATION_API}/${bankingInformationId}`, { json: bankingInformation });
  });

  it('should make DELETE request to delete banking information by id', async () => {
    const { result } = renderHook(
      () => useBankingInformationMutation(),
      { wrapper },
    );

    await result.current.deleteBankingInformation({ bankingInformation: { id: bankingInformationId } });

    expect(kyMock.delete).toHaveBeenCalledWith(`${BANKING_INFORMATION_API}/${bankingInformationId}`);
  });
});
