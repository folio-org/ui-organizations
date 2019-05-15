import { INTERFACES_API } from '../constants';

export const interfacesResource = {
  throwErrors: false,
  type: 'okapi',
  records: 'interfaces',
  path: INTERFACES_API,
};

export const interfaceResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${INTERFACES_API}/:{id}`,
  POST: {
    path: INTERFACES_API,
  }
};
