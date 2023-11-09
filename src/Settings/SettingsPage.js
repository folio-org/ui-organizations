import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import { useBankingInformationSettings } from '../common/hooks';
import { CategorySettings } from './CategorySettings';
import { TypeSettings } from './TypeSettings';
import { BankingAccountTypeSettings } from './BankingAccountTypeSettings';
import { BankingInformationSettings } from './BankingInformationSettings';

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
  const { enabled } = useBankingInformationSettings();

  const settingsPages = useMemo(() => (enabled ? pages.concat(bankingAccountTypesPage) : pages), [enabled]);

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
