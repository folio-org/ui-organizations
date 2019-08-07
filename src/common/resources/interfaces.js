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
  },
};

export const interfaceCredentialsResource = {
  clientGeneratePk: false,
  throwErrors: false,
  type: 'okapi',
  pk: 'FAKE_PK',  // it's done to fool stripes-connect not to add cred id to the path's end.
  path: `${INTERFACES_API}/:{id}/credentials`,
  permissionsRequired: 'organizations-storage.interfaces.credentials.item.get',
  POST: {
    path: `${INTERFACES_API}/%{interfaceId}/credentials`,
  },
};
