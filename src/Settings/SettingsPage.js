import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import { CategorySettings } from './CategorySettings';
import { TypeSettings } from './TypeSettings';

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
];

const SettingsPage = (props) => (
  <Settings
    {...props}
    pages={pages}
    paneTitle={<FormattedMessage id="ui-organizations.settings.vendorSettings" />}
  />
);

export default SettingsPage;
