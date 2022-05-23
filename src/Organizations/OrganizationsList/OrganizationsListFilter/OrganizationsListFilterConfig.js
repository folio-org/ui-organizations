import { buildArrayFieldQuery } from '@folio/stripes-acq-components';

import { FILTERS } from './constants';

export const customFilterMap = {
  [FILTERS.ADDRESS_COUNTRY]: (filterValue) => `${FILTERS.ADDRESS_COUNTRY}=country:${filterValue}`,
  [FILTERS.ACQUISITIONS_UNIT]: buildArrayFieldQuery.bind(null, [FILTERS.ACQUISITIONS_UNIT]),
  [FILTERS.TAGS]: buildArrayFieldQuery.bind(null, [FILTERS.TAGS]),
  [FILTERS.TYPES]: buildArrayFieldQuery.bind(null, [FILTERS.TYPES]),
};

export const CUSTOM_SORT_MAP = {
  orgName: 'name',
  orgCode: 'code',
  orgDescription: 'description',
  orgStatus: 'status',
};
