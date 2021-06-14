import {
  deleteContact,
  unassign,
} from './util';

describe('View contact utils', () => {
  describe('deleteContact', () => {
    it('should delete contact when id is defined', async () => {
      const contactId = 'contactId';
      const contactMutator = {
        DELETE: jest.fn(),
      };

      await deleteContact({}, contactMutator, contactId);

      expect(contactMutator.DELETE).toHaveBeenCalledWith({ id: 'contactId' });
    });

    it('should not delete contact when id is not defined', async () => {
      const contactMutator = {
        DELETE: jest.fn(),
      };

      await deleteContact({}, contactMutator);

      expect(contactMutator.DELETE).not.toHaveBeenCalled();
    });
  });

  describe('unassign', () => {
    it('should not update org when org is not passed', async () => {
      const orgMutator = {
        PUT: jest.fn(),
      };

      await unassign(orgMutator, 'contactId');

      expect(orgMutator.PUT).not.toHaveBeenCalled();
    });

    it('should update org without passed interface', async () => {
      const contactId = 'contactId';
      const orgMutator = {
        PUT: jest.fn(),
      };
      const org = { id: 'orgId', contacts: [] };

      await unassign(orgMutator, contactId, { ...org, contacts: [contactId] });

      expect(orgMutator.PUT).toHaveBeenCalledWith(org);
    });
  });
});
