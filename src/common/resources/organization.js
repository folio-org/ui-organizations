import {
  baseManifest,
  VENDORS_API,
} from '@folio/stripes-acq-components';

export const organizationsResource = {
  ...baseManifest,
  accumulate: true,
  fetch: false,
  path: VENDORS_API,
};

export const organizationResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${VENDORS_API}/!{orgId}`,
};

export const organizationResourceByUrl = {
  ...baseManifest,
  path: `${VENDORS_API}/:{id}`,
};

export const fetchOrgsByParam = {
  ...organizationsResource,
  records: 'organizations',
  accumulate: true,
  fetch: false,
};
