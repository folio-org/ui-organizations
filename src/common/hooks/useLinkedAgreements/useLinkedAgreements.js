import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { AGREEMENTS_API } from '../../constants';

export const useLinkedAgreements = (organizationId, pagination) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'linked-agreements' });

  const searchParams = {
    stats: true,
    filters: `orgs.org.orgsUuid==${organizationId}`,
    perPage: pagination.limit,
    offset: pagination.offset,
    sort: 'name;asc',
  };

  const queryKeys = [
    namespace,
    organizationId,
    pagination.limit,
    pagination.offset,
  ];
  const queryFn = () => ky.get(AGREEMENTS_API, { searchParams }).json();
  const options = {
    enabled: Boolean(organizationId),
    keepPreviousData: true,
  };

  const {
    data,
    isFetching,
    isLoading,
  } = useQuery(
    queryKeys,
    queryFn,
    options,
  );

  return ({
    agreements: data?.results || [],
    isFetching,
    isLoading,
    totalCount: data?.totalRecords,
  });
};
