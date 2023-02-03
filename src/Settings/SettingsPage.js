import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import CategorySettings from './CategorySettings';
import { TypeSettings } from './TypeSettings';
import NumberGeneratorOptions from './NumberGeneratorOptions';

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
    component: NumberGeneratorOptions,
    label: <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions" />,
    perm: 'settings.organizations.enabled',
    interface: 'servint',
    route: 'numberGeneratorOptions',
  },
];

const SettingsPage = (props) => {
  return (
    <Settings
      {...props}
      pages={pages}
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
