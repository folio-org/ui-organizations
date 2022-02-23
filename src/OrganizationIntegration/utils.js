import { flow, join, map, pick, values } from 'lodash/fp';
import moment from 'moment-timezone';

import { EDI_NAMING_TOKENS } from './constants';

export const buildAvailableAccounts = (organization, integrations, currentIntegration) => {
  const accounts = organization.accounts.map(({ accountNo }) => accountNo);
  const usedAccounts = integrations
    .filter(({ id }) => id !== currentIntegration?.id)
    .map(integration => (
      integration?.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.ediConfig?.accountNoList
      || []
    ))
    .flat();
  const usedAccountsSet = new Set(usedAccounts);

  return accounts.filter(account => !usedAccountsSet.has(account));
};

export const findDefaultIntegration = (integrations, currentIntegration) => {
  return integrations
    .find(integration => (
      integration.id !== currentIntegration?.id
      && integration.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.isDefaultConfig
    ));
};

export const getAcqMethodOptions = (acqMethods = []) => acqMethods.map(acqMethod => ({
  label: acqMethod.value,
  value: acqMethod.id,
}));

export const getAccountOptions = (accounts = []) => accounts.map(account => ({
  label: account,
  value: account,
}));

export const getTenantTime = ({ time, timeZone }) => {
  const date = new Date().toISOString();
  const trimmedTime = time.slice(0, 8);
  const trimmedDate = date.slice(0, 11);
  const tenantDate = moment.tz(`${trimmedDate}${trimmedTime}.000Z`, timeZone).format();

  return tenantDate.slice(11, 19);
};

export const getUTCDate = ({ time, date, timezone }) => {
  const tenantDate = moment.tz(date, timezone).format();
  const trimmedDate = tenantDate.slice(0, 11);
  const trimmedTime = time.slice(0, 8);
  const tenantTimezone = tenantDate.slice(19);

  return moment.tz(`${trimmedDate}${trimmedTime}${tenantTimezone}`, 'UTC').format();
};

export const getDefaultEdiNamingConvention = () => (
  flow(
    pick([
      'organizationCode',
      'integrationName',
      'exportJobEndDate',
    ]),
    values,
    map(token => `{${token}}`),
    join('-'),
  )(EDI_NAMING_TOKENS)
);
