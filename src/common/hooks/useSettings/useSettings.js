import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { CONFIG_API } from '../../constants';

export const useSettings = (configNames = []) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'settings' });

  let query = 'module==ORGANIZATIONS';

  if (configNames?.length > 0) {
    const configNamesString = configNames?.map(cfn => `configName==${cfn}`).join(' or ');

    query = `${query} AND (${configNamesString})`;
  }

  const searchParams = {
    query,
  };

  const queryKeys = [
    namespace,
  ];

  const queryFn = () => ky.get(CONFIG_API, { searchParams }).json();
  const options = {
    enabled: configNames?.length > 0,
    keepPreviousData: true,
  };

  const {
    data,
    isFetching,
    isLoading,
    ...rest
  } = useQuery(
    queryKeys,
    queryFn,
    options,
  );

  const settings = data?.configs ?? [];

  const parsedSettings = settings?.map(sett => ({
    ...sett,
    parsedSettings: JSON.parse(sett?.value ?? '{}'),
  }));

  return ({
    settings: parsedSettings,
    isFetching,
    isLoading,
    totalCount: data?.totalRecords,
    ...rest,
  });
};
