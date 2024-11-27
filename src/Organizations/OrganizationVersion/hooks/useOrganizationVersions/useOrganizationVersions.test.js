import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useOrganizationVersions } from './useOrganizationVersions';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useOrganizationVersions', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    useOkapiKy.mockReturnValue({ get: mockGet });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return default data when organizationId is not provided', async () => {
    const { result } = renderHook(() => useOrganizationVersions(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.versions).toEqual([]);
  });

  it('should fetch and return organization versions', async () => {
    const mockData = { organizationAuditEvents: [{ id: '1', name: 'Version 1' }] };

    mockGet.mockReturnValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useOrganizationVersions('org-1'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.versions).toEqual(mockData.organizationAuditEvents);
  });
});
