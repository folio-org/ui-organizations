import {
  CONTACTS_API,
  MAX_LIMIT,
  PRIVILEGED_CONTACTS_API,
} from '../constants';

export const contactResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${CONTACTS_API}/:{id}`,
  POST: {
    path: CONTACTS_API,
  },
};

export const privilegedContactResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${PRIVILEGED_CONTACTS_API}/:{id}`,
  POST: {
    path: PRIVILEGED_CONTACTS_API,
  },
};

export const baseContactsResource = {
  throwErrors: false,
  type: 'okapi',
  records: 'contacts',
  path: CONTACTS_API,
  perRequest: MAX_LIMIT,
};
