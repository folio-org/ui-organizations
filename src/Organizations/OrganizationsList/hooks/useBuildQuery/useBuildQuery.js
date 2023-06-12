import { useCallback } from 'react';

import {
  makeQueryBuilder,
} from '@folio/stripes-acq-components';
import {
  filterMap,
  getKeywordQuery,
} from '@folio/plugin-find-organization';

const CUSTOM_SORT_MAP = {
  orgName: 'name',
  orgCode: 'code',
  orgDescription: 'description',
  orgStatus: 'status',
};

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
    filterMap,
    CUSTOM_SORT_MAP,
  ), []);
};
