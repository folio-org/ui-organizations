import { INTERFACES_API, MAX_LIMIT } from '../constants';

export const interfacesResource = {
  throwErrors: false,
  type: 'okapi',
  records: 'interfaces',
  path: INTERFACES_API,
  perRequest: MAX_LIMIT,
};

export const interfaceResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${INTERFACES_API}/:{id}`,
  POST: {
    path: INTERFACES_API,
  }
};
