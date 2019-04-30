import { without } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const unassign = (mutator, contactId, org) => {
  if (org) {
    const contacts = without(org.contacts, contactId);
    return mutator.PUT({
      ...org,
      contacts,
    });
  }

  return Promise.resolve();
};
