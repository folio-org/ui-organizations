import { flow, join, map, pick, values } from 'lodash/fp';
import moment from 'moment-timezone';

import {
  validateRequired,
  validateURLRequired,
} from '@folio/stripes-acq-components';

import {
  EDI_NAMING_TOKENS,
  FILE_FORMAT,
  INTEGRATION_TYPE,
  TRANSMISSION_METHOD,
} from './constants';

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

export const getIntegrationTypeOptions = (intl) => {
  return Object.entries(INTEGRATION_TYPE).map(([key, value]) => ({
    label: intl.formatMessage({ id: `ui-organizations.integration.info.integrationType.${key}` }),
    value,
  }));
};

export const getTransmissionMethodOptions = (intl) => {
  return Object.entries(TRANSMISSION_METHOD).map(([key, value]) => ({
    label: intl.formatMessage({ id: `ui-organizations.integration.info.transmissionMethod.${key}` }),
    value,
  }));
};

export const getFileFormatOptions = () => {
  return Object.values(FILE_FORMAT).map((value) => ({
    label: value,
    value,
  }));
};

export const isFileFormat = (config, type) => {
  const integrationType = config
    ?.exportTypeSpecificParameters
    ?.vendorEdiOrdersExportConfig
    ?.fileFormat;

  return integrationType === type;
};

export const isFileFormatEDI = (config) => {
  return isFileFormat(config, FILE_FORMAT.edi);
};

export const isTransmissionMethod = (config, type) => {
  const transmissionMethod = config
    ?.exportTypeSpecificParameters
    ?.vendorEdiOrdersExportConfig
    ?.transmissionMethod;

  return transmissionMethod === type;
};

export const isTransmissionMethodFTP = (config) => {
  return isTransmissionMethod(config, TRANSMISSION_METHOD.ftp);
};

export const isIntegrationType = (config, type) => {
  const integrationType = config
    ?.exportTypeSpecificParameters
    ?.vendorEdiOrdersExportConfig
    ?.integrationType;

  return integrationType === type;
};

export const isClaimingIntegration = (config) => {
  return isIntegrationType(config, INTEGRATION_TYPE.claiming);
};

export const isOrderingIntegration = (config) => {
  return isIntegrationType(config, INTEGRATION_TYPE.ordering);
};

export const getDuplicateTimestamp = ({ intl }) => {
  const timestamp = intl.formatDate(Date.now(), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return timestamp;
};

/* Validators */

/*
 * Returns a function that checks if the condition is met and then applies the validator.
 * If the condition is not met, it returns undefined.
 */
export const createConditionalValidator = (condition, validator) => {
  return (value, allValues, meta) => {
    return condition(allValues, value, meta) ? validator(value, allValues, meta) : undefined;
  };
};

export const validateAccountNumbersField = (...params) => {
  return createConditionalValidator(isFileFormatEDI, validateRequired)(...params);
};

export const validateVendorEDICode = (...params) => {
  return createConditionalValidator(isFileFormatEDI, validateRequired)(...params);
};

export const validateLibraryEDICode = (...params) => {
  return createConditionalValidator(isFileFormatEDI, validateRequired)(...params);
};

export const validateFTPServerAddress = (...params) => {
  return createConditionalValidator(isTransmissionMethodFTP, validateURLRequired)(...params);
};

export const validateFTPPort = (...params) => {
  return createConditionalValidator(isTransmissionMethodFTP, validateRequired)(...params);
};
