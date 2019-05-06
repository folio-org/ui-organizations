import { without } from 'lodash';

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

export const deleteContact = (orgMutator, contactMutator, contactId, org) => {
  if (contactId) {
    return unassign(orgMutator, contactId, org)
      .then(() => contactMutator.DELETE({ id: contactId }));
  }

  return Promise.resolve();
};
