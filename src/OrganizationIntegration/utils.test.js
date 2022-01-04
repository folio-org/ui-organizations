import {
  buildAvailableAccounts,
  findDefaultIntegration,
  getAcqMethodOptions,
  getAccountOptions,
} from './utils';

const organization = {
  accounts: [{ accountNo: '123' }, { accountNo: '456' }, { accountNo: '789' }],
};
const integrationConfig = {
  id: 1,
  exportTypeSpecificParameters: {
    vendorEdiOrdersExportConfig: {
      isDefaultConfig: false,
      ediConfig: {
        accountNoList: ['456'],
      },
    },
  },
};
const integrationConfigs = [
  integrationConfig,
  {
    id: 2,
    exportTypeSpecificParameters: {
      vendorEdiOrdersExportConfig: {
        isDefaultConfig: true,
        ediConfig: {
          accountNoList: ['123'],
        },
      },
    },
  },
];

const acqMethods = [{ id: 'acqMethodId', value: 'acqMethod' }];
const accounts = ['1'];

describe('OrganizationIntegration utils', () => {
  describe('buildAvailableAccounts', () => {
    it('should return accounts in existing configs use except current config', () => {
      expect(
        buildAvailableAccounts(organization, integrationConfigs, integrationConfig),
      ).toEqual(['456', '789']);
    });
  });

  describe('findDefaultIntegration', () => {
    it('should find default config', () => {
      expect(findDefaultIntegration(integrationConfigs, integrationConfig)).toEqual(integrationConfigs[1]);
    });

    it('should find default config excluding current config', () => {
      const currentConfig = {
        id: 1,
        exportTypeSpecificParameters: {
          vendorEdiOrdersExportConfig: {
            isDefaultConfig: true,
          },
        },
      };

      expect(findDefaultIntegration([currentConfig], currentConfig)).not.toBeDefined();
    });
  });

  describe('getAcqMethodOptions', () => {
    it('should return acq method options', () => {
      expect(getAcqMethodOptions(acqMethods)).toEqual([{ label: acqMethods[0].value, value: acqMethods[0].id }]);
    });
  });

  describe('getAccountOptions', () => {
    it('should return account options', () => {
      expect(getAccountOptions(accounts))
        .toEqual([{ label: accounts[0], value: accounts[0] }]);
    });
  });
});
