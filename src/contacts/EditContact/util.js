import get from 'lodash/get';

export const saveContact = (mutator, contact, org, isPrivilegedContactUrl = false) => {
  const isNew = !contact.id;
  const currentMutator = isPrivilegedContactUrl ? mutator.privilegedContact : mutator.contact;
  const httpMethod = isNew ? currentMutator.POST : currentMutator.PUT;
  const fieldName = isPrivilegedContactUrl ? 'privilegedContacts' : 'contacts';

  return httpMethod(contact)
    .then(savedContact => {
      if (isNew && org && org.id) {
        mutator.contactsOrg.PUT({
          ...org,
          [fieldName]: [...get(org, fieldName, []), savedContact.id],
        });
      }

      return savedContact || contact;
    });
};
