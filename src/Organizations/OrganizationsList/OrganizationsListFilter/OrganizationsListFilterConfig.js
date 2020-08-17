import { FILTERS } from './constants';

export const customFilterMap = {
  [FILTERS.ADDRESS_COUNTRY]: (filterValue) => `${FILTERS.ADDRESS_COUNTRY}=country:${filterValue}`,
};

export const CUSTOM_SORT_MAP = {
  orgName: 'name',
  orgCode: 'code',
  orgDescription: 'description',
  orgStatus: 'status',
};
