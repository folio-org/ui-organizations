import { CONTACTS_API } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const contactResource = {
  type: 'okapi',
  path: (queryParams, pathComponents) => {
    if (pathComponents.id) return `${CONTACTS_API}/${pathComponents.id}`;
    return undefined;
  },
};
