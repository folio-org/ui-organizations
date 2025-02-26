import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useOrganizationMutation } from './useOrganizationMutation';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useOrganizationMutation', () => {
  const postMock = jest.fn(() => ({
    json: jest.fn(() => Promise.resolve()),
  }));
  const putMock = jest.fn(() => ({
    json: jest.fn(() => Promise.resolve()),
  }));

  beforeEach(() => {
    useOkapiKy.mockClear().mockReturnValue({
      post: postMock,
      put: putMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make post request when id is not provided', async () => {
    const { result } = renderHook(
      () => useOrganizationMutation(),
      { wrapper },
    );

    await result.current.createOrganization({ data: { id: 'org-id' } });

    expect(postMock).toHaveBeenCalled();
  });

  it('should make put request when id is provided', async () => {
    const { result } = renderHook(
      () => useOrganizationMutation(),
      { wrapper },
    );

    await result.current.updateOrganization({ data: { id: 'org-id' } });

    expect(putMock).toHaveBeenCalled();
  });
});
