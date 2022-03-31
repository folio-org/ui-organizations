import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

import { TYPES_API } from '../../constants';

export const useTypes = () => {
  const ky = useOkapiKy();

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const { isLoading, data } = useQuery(
    ['ui-organizations', 'organization-types'],
    () => {
      const responseData = ky.get(TYPES_API, { searchParams }).json();

      return responseData;
    },
  );

  return ({
    orgTypes: data,
    isLoading,
  });
};
