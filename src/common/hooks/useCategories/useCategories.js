import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import {
  ALL_RECORDS_CQL,
  LIMIT_MAX,
} from '@folio/stripes-acq-components';

import { CATEGORIES_API } from '../../constants';
import { useTranslatedCategories } from '../useTranslatedCategories';

const DEFAULT_DATA = [];

export const useCategories = (options = {}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'categories' });

  const searchParams = {
    limit: LIMIT_MAX,
    query: ALL_RECORDS_CQL,
  };

  const {
    data,
    isFetching,
    isLoading,
  } = useQuery(
    [namespace],
    ({ signal }) => ky.get(CATEGORIES_API, { searchParams, signal }).json(),
    options,
  );

  const [translatedCategories] = useTranslatedCategories(data?.categories);

  return ({
    categories: translatedCategories || DEFAULT_DATA,
    totalRecords: data?.totalRecords,
    isFetching,
    isLoading,
  });
};
