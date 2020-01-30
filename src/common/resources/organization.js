import {
  baseManifest,
} from '@folio/stripes-acq-components';

import { ORGANIZATIONS_API } from '../constants';

export const organizationsResource = {
  ...baseManifest,
  accumulate: true,
  fetch: false,
  path: ORGANIZATIONS_API,
};

export const organizationResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${ORGANIZATIONS_API}/!{orgId}`,
};

export const organizationResourceByUrl = {
  ...baseManifest,
  path: `${ORGANIZATIONS_API}/:{id}`,
};

export const fetchOrgsByParam = {
  ...organizationsResource,
  records: 'organizations',
};
