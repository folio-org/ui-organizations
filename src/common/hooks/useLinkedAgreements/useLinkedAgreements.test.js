import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { useLinkedAgreements } from './useLinkedAgreements';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const mockAgreeemnts = [{
  id: 'agreementId',
}];

describe('useLinkedAgreements', () => {
  const mockGet = jest.fn(() => ({
    json: () => Promise.resolve({
      results: mockAgreeemnts,
      totalRecords: mockAgreeemnts.length,
    }),
  }));

  beforeEach(() => {
    useOkapiKy.mockClear().mockReturnValue({
      get: mockGet,
    });
  });

  it('should fetch organization linked agreements', async () => {
    const { result, waitFor } = renderHook(() => useLinkedAgreements(
      'organizationId',
      {
        limit: 30,
        offset: 0,
      },
    ), { wrapper });

    await waitFor(() => !result.current.isFetching);

    expect(result.current).toEqual(expect.objectContaining({
      agreements: mockAgreeemnts,
      totalCount: mockAgreeemnts.length,
    }));
  });
});
