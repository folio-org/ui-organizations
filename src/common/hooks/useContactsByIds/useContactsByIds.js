import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import { batchFetch } from '@folio/stripes-acq-components';

import { CONTACTS_API } from '../../constants';

const DEFAULT_DATA = [];

export const useContactsByIds = (contactIds, options = {}) => {
  const {
    enabled = true,
    ...queryOptions
  } = options;

  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'contacts' });

  const {
    data,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [namespace, contactIds],
    queryFn: ({ signal }) => batchFetch(
      {
        GET: ({ params: searchParams }) => {
          return ky.get(CONTACTS_API, { searchParams, signal }).json().then(({ contacts }) => contacts);
        },
      },
      contactIds,
    ),
    enabled: Boolean(enabled && contactIds?.length),
    ...queryOptions,
  });

  return ({
    contacts: data || DEFAULT_DATA,
    totalRecords: data?.length,
    isFetching,
    isLoading,
  });
};
