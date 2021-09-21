import { useCallback } from 'react';

import {
  makeQueryBuilder,
} from '@folio/stripes-acq-components';

import {
  getKeywordQuery,
} from '../../OrganizationsListSearchConfig';
import {
  customFilterMap,
  CUSTOM_SORT_MAP,
} from '../../OrganizationsListFilter/OrganizationsListFilterConfig';

export const useBuildQuery = () => {
  return useCallback(makeQueryBuilder(
    'cql.allRecords=1',
    (query, qindex) => {
      if (qindex) {
        return `(${qindex}=${query}*)`;
      }

      return getKeywordQuery(query);
    },
    'sortby name/sort.ascending',
    customFilterMap,
    CUSTOM_SORT_MAP,
  ), []);
};
