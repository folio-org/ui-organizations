import { FILTERS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const filterConfig = [
  {
    name: FILTERS.STATUS,
    cql: FILTERS.STATUS,
    values: [],
  },
  {
    name: FILTERS.TAGS,
    cql: 'tags.tagList',
    values: [],
  },
  {
    name: FILTERS.ADDRESS_CATEGORY,
    cql: 'addresses.categories',
    values: [],
  },
  {
    name: FILTERS.CONTACT_CATEGORY,
    cql: FILTERS.CONTACT_CATEGORY,
    values: [],
  },
  {
    name: FILTERS.ADDRESS_COUNTRY,
    cql: 'addresses',
    values: [],
  },
  {
    name: FILTERS.LANGUAGE,
    cql: FILTERS.LANGUAGE,
    values: [],
  },
  {
    name: FILTERS.PAYMENT_METHOD,
    cql: FILTERS.PAYMENT_METHOD,
    values: [],
  },
  {
    name: FILTERS.STATS_AVAILABLE,
    cql: FILTERS.STATS_AVAILABLE,
    values: [],
  },
  {
    name: FILTERS.IS_VENDOR,
    cql: FILTERS.IS_VENDOR,
    values: [],
  },
];
