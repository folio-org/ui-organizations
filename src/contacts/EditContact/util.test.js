import { saveContact } from './util';

describe('EditContact utils', () => {
  it('should create contact when contact without id', async () => {
    const contact = { name: 'Mark' };
    const mutator = {
      contact: {
        POST: jest.fn().mockReturnValue(Promise.resolve()),
      },
    };

    await saveContact(mutator, contact);

    expect(mutator.contact.POST).toHaveBeenCalledWith(contact);
  });

  it('should update contact when contact with id', async () => {
    const contact = { id: 'contactId', name: 'Mark' };
    const mutator = {
      contact: {
        PUT: jest.fn().mockReturnValue(Promise.resolve()),
      },
    };

    await saveContact(mutator, contact);

    expect(mutator.contact.PUT).toHaveBeenCalledWith(contact);
  });

  it('should assign contact to org when contact is saved successfully and org is provided', async () => {
    const contactId = 'contactId';
    const contact = { name: 'Mark' };
    const org = { id: 'org1', name: 'Amazon', contacts: [] };
    const mutator = {
      contact: {
        POST: jest.fn().mockReturnValue(Promise.resolve({ ...contact, id: contactId })),
      },
      contactsOrg: {
        PUT: jest.fn().mockReturnValue(Promise.resolve()),
      },
    };

    await saveContact(mutator, contact, org);

    expect(mutator.contactsOrg.PUT).toHaveBeenCalledWith({ ...org, contacts: [contactId] });
  });
});
