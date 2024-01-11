import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

import { BANKING_INFORMATION_API } from '../../constants';

const DEFAULT_DATA = [];

export const useOrganizationBankingInformation = (organizationId, options = {}) => {
  const stripes = useStripes();
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organization-banking-information' });

  const { enabled = true, ...rest } = options;
  const queryOptions = {
    ...rest,
    enabled: Boolean(
      enabled
      && Boolean(organizationId)
      && stripes.hasPerm('organizations.banking-information.collection.get'),
    ),
  };

  const {
    data,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    [namespace],
    () => {
      const searchParams = {
        query: `organizationId==${organizationId} sortby metadata.createdDate/sort.ascending`,
        limit: LIMIT_MAX,
      };

      return ky.get(BANKING_INFORMATION_API, { searchParams }).json();
    },
    queryOptions,
  );

  return ({
    bankingInformation: data?.bankingInformation || DEFAULT_DATA,
    totalRecords: data?.totalRecords,
    isFetching,
    isLoading,
    refetch,
  });
};
