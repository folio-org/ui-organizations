import { ORGANIZATIONS_API } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const organizationResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${ORGANIZATIONS_API}/!{orgId}`,
};
