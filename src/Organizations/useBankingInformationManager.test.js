import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { useStripes } from '@folio/stripes/core';

import { organization } from 'fixtures';
import {
  useBankingInformationMutation,
  useBankingInformationSettings,
} from '../common/hooks';
import { useBankingInformationManager } from './useBankingInformationManager';

const mutationsMock = {
  createBankingInformation: jest.fn(),
  updateBankingInformation: jest.fn(),
  deleteBankingInformation: jest.fn(),
};

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useStripes: jest.fn(),
}));

jest.mock('../common/hooks', () => ({
  ...jest.requireActual('../common/hooks'),
  useBankingInformationMutation: jest.fn(),
  useBankingInformationSettings: jest.fn(),
}));

const organizationId = organization.id;
const initBankingInformation = [
  { id: 1, bankName: 'Bank name 1', organizationId },
  { id: 2, bankName: 'Bank name 2', organizationId },
];
const bankingInformation = [
  { id: 1, bankName: 'Bank name 1 (Edited)', organizationId },
  { id: 3, bankName: 'Bank name 3' },
];

const hasPermFactory = (permsMap) => (perm) => {
  return permsMap ? permsMap[perm] : true;
};

const stripesStub = {
  hasPerm: hasPermFactory(),
};

describe('useBankingInformationManager', () => {
  beforeEach(() => {
    Object
      .values(mutationsMock)
      .forEach(fn => fn.mockClear());
    useBankingInformationMutation
      .mockClear()
      .mockReturnValue(mutationsMock);
    useBankingInformationSettings
      .mockClear()
      .mockReturnValue({ enabled: true });
    useStripes
      .mockClear()
      .mockReturnValue(stripesStub);
  });

  it('should handle banking information fields change', async () => {
    const { result } = renderHook(() => useBankingInformationManager());
    const { manageBankingInformation } = result.current;

    await manageBankingInformation({
      initBankingInformation,
      bankingInformation,
      organization,
    });

    expect(mutationsMock.createBankingInformation).toHaveBeenCalledWith({
      bankingInformation: {
        organizationId,
        ...bankingInformation[1],
      },
    });
    expect(mutationsMock.updateBankingInformation).toHaveBeenCalledWith({
      bankingInformation: bankingInformation[0],
    });
    expect(mutationsMock.deleteBankingInformation).toHaveBeenCalledWith({
      bankingInformation: initBankingInformation[1],
    });
  });

  it('should return a resolved promise immediately if an organization is not a vendor', async () => {
    const { result } = renderHook(() => useBankingInformationManager());
    const { manageBankingInformation } = result.current;

    await manageBankingInformation({
      initBankingInformation,
      bankingInformation,
      organization: {
        ...organization,
        isVendor: false,
      },
    });

    expect(mutationsMock.createBankingInformation).not.toHaveBeenCalled();
    expect(mutationsMock.deleteBankingInformation).not.toHaveBeenCalled();
    expect(mutationsMock.updateBankingInformation).not.toHaveBeenCalled();
  });

  it('should return a resolved promise immediately if the banking information settings are disabled', async () => {
    useBankingInformationSettings.mockReturnValue({ enabled: false });

    const { result } = renderHook(() => useBankingInformationManager());
    const { manageBankingInformation } = result.current;

    await manageBankingInformation({
      initBankingInformation,
      bankingInformation,
      organization,
    });

    expect(mutationsMock.createBankingInformation).not.toHaveBeenCalled();
    expect(mutationsMock.deleteBankingInformation).not.toHaveBeenCalled();
    expect(mutationsMock.updateBankingInformation).not.toHaveBeenCalled();
  });

  describe('Permissions handling', () => {
    it('edit banking information item', async () => {
      useStripes.mockReturnValue({ hasPerm: hasPermFactory({ 'organizations.banking-information.item.put': true }) });

      const { result } = renderHook(() => useBankingInformationManager());
      const { manageBankingInformation } = result.current;

      await manageBankingInformation({
        initBankingInformation,
        bankingInformation,
        organization,
      });

      expect(mutationsMock.createBankingInformation).not.toHaveBeenCalled();
      expect(mutationsMock.deleteBankingInformation).not.toHaveBeenCalled();
      expect(mutationsMock.updateBankingInformation).toHaveBeenCalled();
    });

    it('create banking information item', async () => {
      useStripes.mockReturnValue({ hasPerm: hasPermFactory({ 'organizations.banking-information.item.post': true }) });

      const { result } = renderHook(() => useBankingInformationManager());
      const { manageBankingInformation } = result.current;

      await manageBankingInformation({
        initBankingInformation,
        bankingInformation,
        organization,
      });

      expect(mutationsMock.createBankingInformation).toHaveBeenCalled();
      expect(mutationsMock.deleteBankingInformation).not.toHaveBeenCalled();
      expect(mutationsMock.updateBankingInformation).not.toHaveBeenCalled();
    });

    it('delete banking information item', async () => {
      useStripes.mockReturnValue({ hasPerm: hasPermFactory({ 'organizations.banking-information.item.delete': true }) });

      const { result } = renderHook(() => useBankingInformationManager());
      const { manageBankingInformation } = result.current;

      await manageBankingInformation({
        initBankingInformation,
        bankingInformation,
        organization,
      });

      expect(mutationsMock.createBankingInformation).not.toHaveBeenCalled();
      expect(mutationsMock.deleteBankingInformation).toHaveBeenCalled();
      expect(mutationsMock.updateBankingInformation).not.toHaveBeenCalled();
    });

    it('create and edit banking information item', async () => {
      const permsMap = {
        'organizations.banking-information.item.post': true,
        'organizations.banking-information.item.put': true,
      };

      useStripes.mockReturnValue({ hasPerm: hasPermFactory(permsMap) });

      const { result } = renderHook(() => useBankingInformationManager());
      const { manageBankingInformation } = result.current;

      await manageBankingInformation({
        initBankingInformation,
        bankingInformation,
        organization,
      });

      expect(mutationsMock.createBankingInformation).toHaveBeenCalled();
      expect(mutationsMock.deleteBankingInformation).not.toHaveBeenCalled();
      expect(mutationsMock.updateBankingInformation).toHaveBeenCalled();
    });
  });
});
