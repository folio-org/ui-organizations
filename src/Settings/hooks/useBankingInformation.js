import { useQuery } from 'react-query';
import { get } from 'lodash';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { MAX_LIMIT, SETTINGS_API } from '../constants';

export const useBankingInformation = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'banking-information-settings' });

  const searchParams = {
    limit: MAX_LIMIT,
    query: 'key=BANKING_INFORMATION_ENABLED',
  };

  const { isLoading, data } = useQuery(
    [namespace],
    () => ky.get(SETTINGS_API, { searchParams }).json().catch(() => null),
  );

  const bankingInformation = get(data, 'settings[0]', {});

  return ({
    id: bankingInformation.id,
    enabled: bankingInformation.value === 'true',
    key: bankingInformation.key,
    isLoading,
  });
};
