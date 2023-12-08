// eslint-disable-next-line import/prefer-default-export
export const saveContact = (mutator, contact, org, isPrivilegedContactUrl = false) => {
  const isNew = !contact.id;
  const currentMutator = isPrivilegedContactUrl ? mutator.privilegedContact : mutator.contact;
  const httpMethod = isNew ? currentMutator.POST : currentMutator.PUT;

  return httpMethod(contact)
    .then(savedContact => {
      if (isNew && org && org.id) {
        mutator.contactsOrg.PUT({
          ...org,
          contacts: [...org.contacts, savedContact.id],
        });
      }

      return savedContact || contact;
    });
};
