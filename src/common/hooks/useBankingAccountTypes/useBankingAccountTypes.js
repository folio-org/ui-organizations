import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

import { BANKING_ACCOUNT_TYPES_API } from '../../constants';

const DEFAULT_DATA = [];

export const useBankingAccountTypes = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'banking-account-types' });

  const {
    data,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    [namespace],
    () => {
      const searchParams = {
        limit: LIMIT_MAX,
      };

      return ky.get(BANKING_ACCOUNT_TYPES_API, { searchParams }).json();
    },
  );

  return ({
    bankingAccountTypes: data?.bankingAccountTypes || DEFAULT_DATA,
    totalRecords: data?.totalRecords,
    isFetching,
    isLoading,
    refetch,
  });
};
