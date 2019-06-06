import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import CategorySettings from './CategorySettings';

class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.pages = [
      {
        route: 'category',
        label: <FormattedMessage id="ui-organizations.settings.categories" />,
        component: CategorySettings,
      },
    ];
  }

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle={<FormattedMessage id="ui-organizations.settings.vendorSettings" />} />
    );
  }
}

export default SettingsPage;
