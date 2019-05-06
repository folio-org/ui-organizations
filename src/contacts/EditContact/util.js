// eslint-disable-next-line import/prefer-default-export
export const saveContact = (contactMutator, contact) => {
  const httpMethod = contact.id ? contactMutator.PUT : contactMutator.POST;

  return httpMethod(contact);
};
