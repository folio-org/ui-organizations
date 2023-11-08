import { get } from 'lodash';
import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  BANKING_INFORMATION_ENABLED_KEY,
  SETTINGS_API,
} from '../../constants';

const DEFAULT_DATA = {};

export const useBankingInformation = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'banking-information-settings' });

  const {
    data: bankingInformation = DEFAULT_DATA,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    [namespace],
    async () => {
      const response = await ky.get(SETTINGS_API, {
        searchParams: {
          query: `key=${BANKING_INFORMATION_ENABLED_KEY}`,
          limit: 1,
        },
      }).json();

      return get(response, 'settings[0]', DEFAULT_DATA);
    },
  );

  return ({
    bankingInformation,
    enabled: bankingInformation.value === 'true',
    isFetching,
    isLoading,
    refetch,
  });
};
