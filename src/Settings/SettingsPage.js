import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import { useBankingInformationSettings } from '../common/hooks';
import { CategorySettings } from './CategorySettings';
import { TypeSettings } from './TypeSettings';
import NumberGeneratorOptions from './NumberGeneratorOptions';
import { BankingAccountTypeSettings } from './BankingAccountTypeSettings';
import { BankingInformationSettings } from './BankingInformationSettings';

const pages = [
  {
    component: CategorySettings,
    label: <FormattedMessage id="ui-organizations.settings.categories" />,
    perm: 'ui-organizations.settings.view',
    route: 'category',
  },
  {
    component: TypeSettings,
    label: <FormattedMessage id="ui-organizations.settings.types" />,
    perm: 'ui-organizations.settings.view',
    route: 'type',
  },
  {
    component: NumberGeneratorOptions,
    label: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions" />,
    perm: 'ui-organizations.settings.numberGenerator.manage',
    interface: 'servint',
    route: 'numberGeneratorOptions',
  },
  {
    component: BankingInformationSettings,
    label: <FormattedMessage id="ui-organizations.settings.bankingInformation" />,
    perm: 'ui-organizations.settings.view',
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

SettingsPage.propTypes = {
  stripes: PropTypes.shape({
    hasInterface: PropTypes.func.isRequired,
    timezone: PropTypes.string.isRequired,
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func,
    }),
  }).isRequired,
};

export default SettingsPage;
