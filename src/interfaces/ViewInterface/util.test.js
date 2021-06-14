import {
  deleteInterface,
  unassignInterface,
} from './util';

describe('View interface utils', () => {
  describe('deleteInterface', () => {
    it('should delete interface when id is defined', async () => {
      const interfaceId = 'interfaceId';
      const interfaceMutator = {
        DELETE: jest.fn(),
      };

      await deleteInterface({}, interfaceMutator, interfaceId);

      expect(interfaceMutator.DELETE).toHaveBeenCalledWith({ id: 'interfaceId' });
    });

    it('should not delete interface when id is not defined', async () => {
      const interfaceMutator = {
        DELETE: jest.fn(),
      };

      await deleteInterface({}, interfaceMutator);

      expect(interfaceMutator.DELETE).not.toHaveBeenCalled();
    });
  });

  describe('unassignInterface', () => {
    it('should not update org when org is not passed', async () => {
      const orgMutator = {
        PUT: jest.fn(),
      };

      await unassignInterface(orgMutator, 'interfaceId');

      expect(orgMutator.PUT).not.toHaveBeenCalled();
    });

    it('should update org without passed interface', async () => {
      const interfaceId = 'interfaceId';
      const orgMutator = {
        PUT: jest.fn(),
      };
      const org = { id: 'orgId', interfaces: [] };

      await unassignInterface(orgMutator, interfaceId, { ...org, interfaces: [interfaceId] });

      expect(orgMutator.PUT).toHaveBeenCalledWith(org);
    });
  });
});
