export const buildAvailableAccounts = (organization, integrations) => {
  const accounts = organization.accounts.map(({ accountNo }) => accountNo);
  const usedAccounts = integrations
    .map(integration => (
      integration?.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.ediConfig?.accountNoList
      || []
    ))
    .flat();
  const usedAccountsSet = new Set(usedAccounts);

  return accounts.filter(account => !usedAccountsSet.has(account));
};
