import { FILTERS } from './constants';

export const customFilterMap = {
  [FILTERS.ADDRESS_COUNTRY]: (filterValue) => `${FILTERS.ADDRESS_COUNTRY}=country:${filterValue}`,
};
