import { CONTACTS_API } from '../constants';

export const contactResource = {
  throwErrors: false,
  type: 'okapi',
  path: (queryParams, pathComponents) => {
    if (pathComponents.id) return `${CONTACTS_API}/${pathComponents.id}`;
    return undefined;
  },
};

export const baseContactsResource = {
  throwErrors: false,
  type: 'okapi',
  records: 'contacts',
  path: CONTACTS_API,
};

export const contactDetailsResource = {
  throwErrors: false,
  type: 'okapi',
  path: `${CONTACTS_API}/:{id}`,
};
