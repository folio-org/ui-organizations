import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import {
  getFiltersCount,
  VENDORS_API,
} from '@folio/stripes-acq-components';

import { useBuildQuery } from '../useBuildQuery';

export const useOrganizations = ({
  pagination,
  searchParams = {},
  options = {},
}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organizations-list' });

  const { search } = useLocation();
  const buildQuery = useBuildQuery();
  const queryParams = queryString.parse(search);
  const query = buildQuery(queryParams);
  const filtersCount = getFiltersCount(queryParams);

  const defaultSearchParams = {
    query,
    limit: pagination.limit,
    offset: pagination.offset,
  };

  const queryKey = [namespace, pagination.timestamp, pagination.limit, pagination.offset];
  const queryFn = () => {
    if (!filtersCount) {
      return { organizations: [], totalRecords: 0 };
    }

    return ky
      .get(VENDORS_API, { searchParams: { ...defaultSearchParams, ...searchParams } })
      .json();
  };
  const defaultOptions = {
    enabled: Boolean(pagination.timestamp),
    keepPreviousData: true,
  };

  const { isFetching, data } = useQuery(
    queryKey,
    queryFn,
    {
      ...defaultOptions,
      ...options,
    },
  );

  return ({
    ...data,
    isFetching,
  });
};
