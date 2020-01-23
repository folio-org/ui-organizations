// eslint-disable-next-line import/prefer-default-export
export const saveContact = (mutator, contact, org) => {
  const isNew = !contact.id;
  const httpMethod = isNew ? mutator.contact.POST : mutator.contact.PUT;

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
