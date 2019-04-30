import { CONTACTS_API } from '../constants';

export const contactResource = {
  type: 'okapi',
  path: (queryParams, pathComponents) => {
    if (pathComponents.id) return `${CONTACTS_API}/${pathComponents.id}`;
    return undefined;
  },
};

export const baseContactsResource = {
  type: 'okapi',
  records: 'contacts',
  path: CONTACTS_API,
};
