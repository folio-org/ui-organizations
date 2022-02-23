import {
  baseManifest,
} from '@folio/stripes-acq-components';

import { TYPES_API } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const typesResource = {
  ...baseManifest,
  records: 'organizationTypes',
  path: TYPES_API,
};
