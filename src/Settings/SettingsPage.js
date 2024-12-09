import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import {
  useBankingInformationSettings,
  useVendorCodeGeneratorSettings,
} from '../common/hooks';
import { CategorySettings } from './CategorySettings';
import { TypeSettings } from './TypeSettings';
import { BankingAccountTypeSettings } from './BankingAccountTypeSettings';
import { BankingInformationSettings } from './BankingInformationSettings';
import { NumberGeneratorSettings } from './NumberGeneratorSettings';

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

const numberGeneratorOptionsPage = {
  component: NumberGeneratorSettings,
  label: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions" />,
  perm: 'ui-organizations.settings.numberGenerator.manage',
  route: 'numberGeneratorOptions',
};

const SettingsPage = (props) => {
  const { enabled: bankingInformationEnabled } = useBankingInformationSettings();
  const { enabled: numberGeneratorEnabled } = useVendorCodeGeneratorSettings();

  const settingsPages = useMemo(() => {
    return [
      ...pages,
      ...(bankingInformationEnabled ? [bankingAccountTypesPage] : []),
      ...(numberGeneratorEnabled ? [numberGeneratorOptionsPage] : []),
    ];
  }, [bankingInformationEnabled, numberGeneratorEnabled]);

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
