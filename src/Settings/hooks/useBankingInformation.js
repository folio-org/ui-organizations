import { get } from 'lodash';
import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  BANKING_INFORMATION_SEARCH_PARAMS,
  SETTINGS_API,
} from '../constants';

export const useBankingInformation = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'banking-information-settings' });

  const { isLoading, data, refetch } = useQuery(
    [namespace],
    () => ky.get(SETTINGS_API, {
      searchParams: BANKING_INFORMATION_SEARCH_PARAMS,
    }).json(),
  );

  const bankingInformation = get(data, 'settings[0]', {});

  return ({
    id: bankingInformation.id,
    enabled: bankingInformation.value === 'true',
    key: bankingInformation.key,
    isLoading,
    refetch,
  });
};
