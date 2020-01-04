import {
  baseManifest,
} from '@folio/stripes-acq-components';

import { ORGANIZATIONS_API } from '../constants';

export const organizationsResource = {
  ...baseManifest,
  path: ORGANIZATIONS_API,
  accumulate: true,
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
