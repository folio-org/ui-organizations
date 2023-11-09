import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { BANKING_INFORMATION_API } from '../../constants';

const DEFAULT_DATA = [];

export const useOrganizationBankingInformation = (organizationId, options = {}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organization-banking-information' });

  const queryOptions = {
    ...options,
    enabled: options.enabled && Boolean(organizationId),
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
        query: `organizationId==${organizationId}`,
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
