import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import { batchFetch } from '@folio/stripes-acq-components';

import { INTERFACES_API } from '../../constants';

const DEFAULT_DATA = [];

export const useInterfacesByIds = (interfaceIds, options = {}) => {
  const {
    enabled = true,
    ...queryOptions
  } = options;

  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'interfaces' });

  const {
    data,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [namespace, interfaceIds],
    queryFn: ({ signal }) => batchFetch(
      {
        GET: ({ params: searchParams }) => {
          return ky.get(INTERFACES_API, { searchParams, signal }).json().then(({ interfaces }) => interfaces);
        },
      },
      interfaceIds,
    ),
    enabled: Boolean(enabled && interfaceIds?.length),
    ...queryOptions,
  });

  return {
    interfaces: data || DEFAULT_DATA,
    totalRecords: data?.length,
    isFetching,
    isLoading,
  };
};
