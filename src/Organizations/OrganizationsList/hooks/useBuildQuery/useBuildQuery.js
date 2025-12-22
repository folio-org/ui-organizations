import { useCallback } from 'react';

import { useStripes } from '@folio/stripes/core';
import { makeQueryBuilder } from '@folio/stripes-acq-components';
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
  const stripes = useStripes();

  return useCallback((queryParams, options) => {
    return makeQueryBuilder(
      'cql.allRecords=1',
      (query, qindex) => {
        if (qindex) {
          return `(${qindex}=${query}*)`;
        }

        return getKeywordQuery(query, stripes);
      },
      'sortby name/sort.ascending',
      filterMap,
      CUSTOM_SORT_MAP,
    )(queryParams, options);
  }, [stripes]);
};
