import { renderHook, act } from '@testing-library/react-hooks';
import useSaveInterface from './useSaveInterface';

const username = 'test';
const password = 'test';
const values = { name: 'new interface' };
const org = { id: 'orgId', interfaces: [] };
const creds = {};

describe('test useSaveInterface', () => {
  let vendorInterface;
  let interfaceCredentials;
  let interfaceOrg;
  let interfaceId;

  beforeEach(() => {
    vendorInterface = {
      POST: jest.fn(() => Promise.resolve({ id: 'interfaceId' })),
      PUT: jest.fn(() => Promise.resolve({ id: 'interfaceId' })),
    };
    interfaceCredentials = {
      POST: jest.fn(() => Promise.resolve()),
      PUT: jest.fn(() => Promise.resolve()),
    };
    interfaceOrg = {
      PUT: jest.fn(() => Promise.resolve()),
    };
    interfaceId = {
      replace: jest.fn(() => { }),
    };
  });

  const { result } = renderHook(() => useSaveInterface());

  describe('new interface, error while saving org', () => {
    it('save creds should be called', async () => {
      interfaceOrg = { PUT: jest.fn(() => Promise.reject()) };
      await act(async () => {
        return result.current(
          { vendorInterface, interfaceCredentials, interfaceId, interfaceOrg },
          { username, password, ...values },
          creds,
          org,
        );
      });

      expect(vendorInterface.POST).toHaveBeenCalled();
      expect(interfaceOrg.PUT).toHaveBeenCalled();
      expect(interfaceId.replace).toHaveBeenCalled();
      expect(interfaceCredentials.POST).toHaveBeenCalled();
    });
  });

  describe('new interface, error while saving interface', () => {
    it('save creds should NOT be called', async () => {
      vendorInterface = { POST: jest.fn(() => Promise.reject()) };
      await act(async () => {
        return result.current(
          { vendorInterface, interfaceCredentials, interfaceId, interfaceOrg },
          { username, password, ...values },
          creds,
          org,
        );
      });

      expect(vendorInterface.POST).toHaveBeenCalled();
      expect(interfaceOrg.PUT).not.toHaveBeenCalled();
      expect(interfaceId.replace).not.toHaveBeenCalled();
      expect(interfaceCredentials.POST).not.toHaveBeenCalled();
    });
  });

  describe('happy path of create interface', () => {
    it('all mutators are called', async () => {
      await act(async () => {
        return result.current(
          { vendorInterface, interfaceCredentials, interfaceId, interfaceOrg },
          { username, password, ...values },
          creds,
          org,
        );
      });

      expect(vendorInterface.POST).toHaveBeenCalled();
      expect(interfaceOrg.PUT).toHaveBeenCalled();
      expect(interfaceId.replace).toHaveBeenCalled();
      expect(interfaceCredentials.POST).toHaveBeenCalled();
    });
  });

  describe('happy path of edit interface with existent creds', () => {
    it('all mutators are called', async () => {
      await act(async () => {
        return result.current(
          { vendorInterface, interfaceCredentials, interfaceId, interfaceOrg },
          { username, password, id: 'interfaceId', ...values },
          { id: 'credsId' },
          org,
        );
      });

      expect(vendorInterface.PUT).toHaveBeenCalled();
      expect(interfaceOrg.PUT).not.toHaveBeenCalled();  // it's already assigned to some org
      expect(interfaceId.replace).toHaveBeenCalled();
      expect(interfaceCredentials.PUT).toHaveBeenCalled();
    });
  });
});
