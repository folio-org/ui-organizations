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
