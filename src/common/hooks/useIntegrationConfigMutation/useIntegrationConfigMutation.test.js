import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import { useOkapiKy } from '@folio/stripes/core';

import { SCHEDULE_PERIODS } from '../../../OrganizationIntegration/constants';
import { useIntegrationConfigMutation } from './useIntegrationConfigMutation';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useIntegrationConfigMutation', () => {
  it('should make post request when id is not provided', async () => {
    const postMock = jest.fn();

    useOkapiKy.mockClear().mockReturnValue({
      post: postMock,
    });

    const { result } = renderHook(
      () => useIntegrationConfigMutation(),
      { wrapper },
    );

    await result.current.mutateIntegrationConfig({
      schedulePeriod: 'NONE',
      exportTypeSpecificParameters: {
        vendorEdiOrdersExportConfig: {
          vendorId: 'orgId',
        },
      },
    });

    expect(postMock).toHaveBeenCalled();
  });

  it('should make put request when id is provided', async () => {
    const putMock = jest.fn();

    useOkapiKy.mockClear().mockReturnValue({
      put: putMock,
    });

    const { result } = renderHook(
      () => useIntegrationConfigMutation(),
      { wrapper },
    );

    await result.current.mutateIntegrationConfig({
      id: 1,
      schedulePeriod: 'NONE',
      exportTypeSpecificParameters: {
        vendorEdiOrdersExportConfig: {
          vendorId: 'orgId',
          ediSchedule: {
            scheduleParameters: {
              schedulePeriod: SCHEDULE_PERIODS.weeks,
              scheduleTime: '00:00:00.00Z',
              weekDays: { MONDAY: true },
            },
          },
        },
      },
    });

    expect(putMock).toHaveBeenCalled();
  });

  it('should make delete request when \'delete\' method is specified in options', async () => {
    const deleteMock = jest.fn();

    useOkapiKy.mockClear().mockReturnValue({
      put: deleteMock,
    });

    const { result } = renderHook(
      () => useIntegrationConfigMutation(),
      { wrapper },
    );

    await result.current.mutateIntegrationConfig({
      id: 1,
      method: 'delete',
    });

    expect(deleteMock).toHaveBeenCalled();
  });
});
