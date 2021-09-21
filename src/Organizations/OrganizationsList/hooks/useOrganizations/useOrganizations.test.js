import { renderHook } from '@testing-library/react-hooks';
import { useLocation } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { useOrganizations } from './useOrganizations';
import { organization } from '../../../../../test/jest/fixtures';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(),
}));
jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useNamespace: () => ['namespace'],
  useOkapiKy: jest.fn(),
}));

const organizations = [organization];

const queryClient = new QueryClient();
// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useOrganizations', () => {
  beforeEach(() => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => ({
            organizations,
            totalRecords: organizations.length,
          }),
        }),
      });
  });

  it('should return an empty list if there no filters were passed in the query', async () => {
    useLocation
      .mockClear()
      .mockReturnValue({ search: '' });

    const { result, waitFor } = renderHook(() => useOrganizations({
      pagination: { limit: 5, offset: 0, timestamp: 42 },
    }), { wrapper });

    await waitFor(() => !result.current.isFetching);

    expect(result.current).toEqual({
      organizations: [],
      totalRecords: 0,
      isFetching: false,
    });
  });

  it('should return fetched organizations list', async () => {
    useLocation
      .mockClear()
      .mockReturnValue({ search: 'status=Inactive&status=Active' });

    const { result, waitFor } = renderHook(() => useOrganizations({
      pagination: { limit: 5, offset: 0, timestamp: 42 },
    }), { wrapper });

    await waitFor(() => !result.current.isFetching);

    expect(result.current).toEqual({
      organizations: [organization],
      totalRecords: 1,
      isFetching: false,
    });
  });
});
