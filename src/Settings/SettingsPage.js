import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

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
  {
    component: BankingAccountTypeSettings,
    label: <FormattedMessage id="ui-organizations.settings.accountTypes" />,
    perm: 'settings.organizations.enabled',
    route: 'account-types',
  },
];

const SettingsPage = (props) => (
  <Settings
    {...props}
    pages={pages}
    paneTitle={<FormattedMessage id="ui-organizations.settings.vendorSettings" />}
  />
);

export default SettingsPage;
