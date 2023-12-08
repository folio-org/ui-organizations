import { saveContact } from './util';

const contactId = 'contactId';
const contact = { name: 'Mark' };
const contactWithId = { id: contactId, name: 'Mark' };
const org = { id: 'org1', name: 'Amazon', contacts: [] };

const contactMutator = {
  contact: {
    POST: jest.fn().mockReturnValue(Promise.resolve({ ...contact, id: contactId })),
    PUT: jest.fn().mockReturnValue(Promise.resolve()),
  },
  privilegedContact: {
    PUT: jest.fn().mockReturnValue(Promise.resolve()),
    POST: jest.fn().mockReturnValue(Promise.resolve({ ...contact, id: contactId })),
  },
  contactsOrg: {
    PUT: jest.fn().mockReturnValue(Promise.resolve()),
  },
};

describe('EditContact utils', () => {
  it('should create contact when contact without id', async () => {
    await saveContact(contactMutator, contact);

    expect(contactMutator.contact.POST).toHaveBeenCalledWith(contact);
  });

  it('should update contact when contact with id', async () => {
    await saveContact(contactMutator, contactWithId);

    expect(contactMutator.contact.PUT).toHaveBeenCalledWith(contactWithId);
  });

  it('should assign contact to org when contact is saved successfully and org is provided', async () => {
    await saveContact(contactMutator, contact, org);

    expect(contactMutator.contactsOrg.PUT).toHaveBeenCalledWith({ ...org, contacts: [contactId] });
  });

  it('should create privileged contact', async () => {
    const isPrivilegedContactUrl = true;

    await saveContact(contactMutator, contact, org, isPrivilegedContactUrl);

    expect(contactMutator.privilegedContact.POST).toHaveBeenCalledWith(contact);
  });

  it('should update privileged contact when with id', async () => {
    const isPrivilegedContactUrl = true;

    await saveContact(contactMutator, contactWithId, org, isPrivilegedContactUrl);

    expect(contactMutator.privilegedContact.PUT).toHaveBeenCalledWith(contactWithId);
  });
});
