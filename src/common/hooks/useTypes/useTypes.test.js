import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { useTypes } from './useTypes';
import { organizationTypes } from '../../../../test/jest/fixtures';

const queryClient = new QueryClient();

const MOCK_TYPES = { orgTypes: { organizationTypes, totalRecords: organizationTypes.length } };

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useTypes', () => {
  beforeEach(() => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => Promise.resolve([MOCK_TYPES]),
        }),
      });
  });

  it('should fetch all organization types', async () => {
    const { result, waitFor } = renderHook(() => useTypes(), { wrapper });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.orgTypes).toEqual([MOCK_TYPES]);
  });
});
