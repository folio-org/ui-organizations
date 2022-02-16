import {
  buildAvailableAccounts,
  findDefaultIntegration,
  getAcqMethodOptions,
  getAccountOptions,
  getTenantTime,
  getUTCDate,
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

  describe('getTenantTime', () => {
    it('should return tenant time', () => {
      expect(getTenantTime({ time: '23:00:00.000Z', timeZone: 'Europe/Berlin' }))
        .toEqual('00:00:00');
    });
  });

  describe('getUTCDate', () => {
    it('should return UTC date time', () => {
      expect(getUTCDate({ time: '05:30:00.000Z', timezone: 'Europe/Berlin', date: '2022-01-01T23:00:00.000Z' }))
        .toEqual('2022-01-02T04:30:00Z');
    });
  });
});
