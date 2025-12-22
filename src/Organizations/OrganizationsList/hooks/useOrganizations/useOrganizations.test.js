import queryString from 'query-string';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { useLocation } from 'react-router';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { FILTERS } from '@folio/plugin-find-organization';
import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import { NO_DST_TIMEZONES } from '@folio/stripes-acq-components/test/jest/fixtures';

import { organization } from 'fixtures';
import { useOrganizations } from './useOrganizations';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(),
}));
jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useNamespace: () => ['namespace'],
  useOkapiKy: jest.fn(),
  useStripes: jest.fn(() => ({})),
}));

const organizations = [organization];

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderTestHook = (...args) => renderHook(() => useOrganizations(...args), { wrapper });
const waitForLoading = async (result) => waitFor(() => expect(result.current.isFetching).toBeFalsy());

describe('useOrganizations', () => {
  const getMock = jest.fn(() => ({
    json: () => ({
      organizations,
      totalRecords: organizations.length,
    }),
  }));

  beforeEach(() => {
    useLocation.mockReturnValue({ search: '' });
    useOkapiKy.mockReturnValue({ get: getMock });
    useStripes.mockReturnValue({ timezone: 'UTC' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty list if there no filters were passed in the query', async () => {
    const { result } = renderTestHook({
      pagination: { limit: 5, offset: 0, timestamp: 42 },
    });

    await waitForLoading(result);

    expect(result.current).toEqual({
      organizations: [],
      totalRecords: 0,
      isFetching: false,
    });
  });

  it('should return fetched organizations list', async () => {
    useLocation.mockReturnValue({ search: 'status=Inactive&status=Active' });

    const { result } = renderTestHook({
      pagination: { limit: 5, offset: 0, timestamp: 42 },
    });

    await waitForLoading(result);

    expect(result.current).toEqual({
      organizations: [organization],
      totalRecords: 1,
      isFetching: false,
    });
  });

  describe('Datetime filters', () => {
    const dateTimeConfig = {
      from: '2014-07-14',
      to: '2020-07-14',
    };

    const expectedResultsDict = {
      [NO_DST_TIMEZONES.AFRICA_DAKAR]: {
        start: '2014-07-14T00:00:00.000',
        end: '2020-07-14T23:59:59.999',
      },
      [NO_DST_TIMEZONES.AMERICA_BOGOTA]: {
        start: '2014-07-14T05:00:00.000',
        end: '2020-07-15T04:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_DUBAI]: {
        start: '2014-07-13T20:00:00.000',
        end: '2020-07-14T19:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_SHANGHAI]: {
        start: '2014-07-13T16:00:00.000',
        end: '2020-07-14T15:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_TOKIO]: {
        start: '2014-07-13T15:00:00.000',
        end: '2020-07-14T14:59:59.999',
      },
      [NO_DST_TIMEZONES.EUROPE_MOSCOW]: {
        start: '2014-07-13T20:00:00.000',
        end: '2020-07-14T20:59:59.999',
      },
      [NO_DST_TIMEZONES.PACIFIC_TAHITI]: {
        start: '2014-07-14T10:00:00.000',
        end: '2020-07-15T09:59:59.999',
      },
      [NO_DST_TIMEZONES.UTC]: {
        start: '2014-07-14T00:00:00.000',
        end: '2020-07-14T23:59:59.999',
      },
    };

    const datetimeFilters = [
      FILTERS.DATE_CREATED,
      FILTERS.DATE_UPDATED,
    ];

    describe.each(Object.values(datetimeFilters))('Datetime range filter: %s', (filter) => {
      it.each(Object.keys(expectedResultsDict))('should properly apply filter for the timezone - %s', async (timezone) => {
        const search = queryString.stringify({
          [filter]: [dateTimeConfig.from, dateTimeConfig.to].join(':'),
        });

        useLocation.mockReturnValue({ search });
        useStripes.mockReturnValue({ timezone });

        const { start, end } = expectedResultsDict[timezone];

        renderTestHook({ pagination: { limit: 5, offset: 0, timestamp: 42 } });

        expect(getMock.mock.calls[0][1].searchParams.query).toContain(`(${filter}>="${start}" and ${filter}<="${end}")`);
      });
    });
  });
});
