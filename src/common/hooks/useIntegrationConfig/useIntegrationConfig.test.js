import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { useIntegrationConfig } from './useIntegrationConfig';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const config = {
  id: 'configId',
  exportTypeSpecificParameters: {
    vendorEdiOrdersExportConfig: {
      vendorId: 'organizationId',
      ediSchedule: {
        scheduleParameters: {
          weekDays: ['MONDAY'],
        },
      },
    },
  },
};

describe('useIntegrationConfig', () => {
  const mockGet = jest.fn(() => ({
    json: () => config,
  }));

  beforeEach(() => {
    useOkapiKy.mockClear().mockReturnValue({
      get: mockGet,
    });
  });

  it('fetches organization integration config', async () => {
    const { result, waitFor } = renderHook(() => useIntegrationConfig(config.id), { wrapper });

    await waitFor(() => !result.current.isFetching);

    expect(result.current.integrationConfig).toEqual({
      id: 'configId',
      exportTypeSpecificParameters: {
        vendorEdiOrdersExportConfig: {
          vendorId: 'organizationId',
          ediSchedule: {
            scheduleParameters: {
              weekDays: { MONDAY: true },
            },
          },
        },
      },
    });
    expect(mockGet).toHaveBeenCalledWith(`data-export-spring/configs/${config.id}`);
  });
});
