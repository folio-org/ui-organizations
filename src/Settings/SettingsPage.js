import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';
import { Loading } from '@folio/stripes/components';

import { useBankingInformation } from './hooks/useBankingInformation';
import { CategorySettings } from './CategorySettings';
import { TypeSettings } from './TypeSettings';
import { BankingInformationSettings } from './BankingInformationSettings';
import { BankingAccountTypeSettings } from './BankingAccountTypeSettings';

const pages = [
  {
    component: CategorySettings,
    label: <FormattedMessage id="ui-organizations.settings.categories" />,
    perm: 'settings.organizations.enabled',
    route: 'category',
  },
  {
    component: TypeSettings,
    label: <FormattedMessage id="ui-organizations.settings.types" />,
    perm: 'settings.organizations.enabled',
    route: 'type',
  },
  {
    component: BankingInformationSettings,
    label: <FormattedMessage id="ui-organizations.settings.bankingInformation" />,
    perm: 'settings.organizations.enabled',
    route: 'banking-information',
  },
];

const bankingAccountTypesPage = {
  component: BankingAccountTypeSettings,
  label: <FormattedMessage id="ui-organizations.settings.bankingAccountTypes" />,
  perm: 'settings.organizations.enabled',
  route: 'banking-account-types',
};

const SettingsPage = (props) => {
  const { enabled, isLoading } = useBankingInformation();

  const settingsPages = useMemo(() => (enabled ? pages.concat(bankingAccountTypesPage) : pages), [enabled]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Settings
      {...props}
      key={settingsPages.length}
      pages={settingsPages}
      paneTitle={<FormattedMessage id="ui-organizations.settings.vendorSettings" />}
    />
  );
};

export default SettingsPage;
