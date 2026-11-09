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

  it('should add vendorName from organization to the request payload', async () => {
    const postMock = jest.fn();

    useOkapiKy.mockClear().mockReturnValue({
      post: postMock,
    });

    const { result } = renderHook(
      () => useIntegrationConfigMutation({ organization: { id: 'orgId', name: 'Amazon' } }),
      { wrapper },
    );

    await result.current.mutateIntegrationConfig({
      exportTypeSpecificParameters: {
        vendorEdiOrdersExportConfig: {
          vendorId: 'orgId',
          vendorName: 'Outdated name',
        },
      },
    });

    expect(postMock).toHaveBeenCalledWith('data-export-spring/configs', {
      json: {
        exportTypeSpecificParameters: {
          vendorEdiOrdersExportConfig: {
            vendorId: 'orgId',
            vendorName: 'Amazon',
          },
        },
      },
    });
  });

  it('should not add vendorName when organization is not provided', async () => {
    const postMock = jest.fn();

    useOkapiKy.mockClear().mockReturnValue({
      post: postMock,
    });

    const { result } = renderHook(
      () => useIntegrationConfigMutation(),
      { wrapper },
    );

    await result.current.mutateIntegrationConfig({
      exportTypeSpecificParameters: {
        vendorEdiOrdersExportConfig: {
          vendorId: 'orgId',
        },
      },
    });

    expect(postMock.mock.calls[0][1].json.exportTypeSpecificParameters.vendorEdiOrdersExportConfig)
      .not.toHaveProperty('vendorName');
  });

  it('should not add vendorName for delete request', async () => {
    const deleteMock = jest.fn();

    useOkapiKy.mockClear().mockReturnValue({
      delete: deleteMock,
    });

    const { result } = renderHook(
      () => useIntegrationConfigMutation({ method: 'delete', organization: { id: 'orgId', name: 'Amazon' } }),
      { wrapper },
    );

    await result.current.mutateIntegrationConfig({
      id: 1,
      exportTypeSpecificParameters: {
        vendorEdiOrdersExportConfig: {
          vendorId: 'orgId',
        },
      },
    });

    expect(deleteMock.mock.calls[0][1].json.exportTypeSpecificParameters.vendorEdiOrdersExportConfig)
      .not.toHaveProperty('vendorName');
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
