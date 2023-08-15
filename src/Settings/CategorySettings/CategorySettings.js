import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { stripesShape } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { getControlledVocabTranslations } from '@folio/stripes-acq-components';

class CategorySettings extends Component {
  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { stripes } = this.props;
    const columnMapping = {
      value: <FormattedMessage id="ui-organizations.settings.name" />,
      action: <FormattedMessage id="ui-organizations.settings.action" />,
    };

    const hasEditPerms = stripes.hasPerm('ui-organizations.settings');
    const actionSuppressor = {
      edit: () => !hasEditPerms,
      delete: () => !hasEditPerms,
    };

    const ConnectedComponent = this.connectedControlledVocab;

    return (
      <ConnectedComponent
        actionSuppressor={actionSuppressor}
        canCreate={hasEditPerms}
        stripes={stripes}
        baseUrl="organizations-storage/categories"
        records="categories"
        label={<FormattedMessage id="ui-organizations.settings.categories" />}
        translations={getControlledVocabTranslations('ui-organizations.settings.categories')}
        objectLabel="Categories"
        visibleFields={['value']}
        columnMapping={columnMapping}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        nameKey="categories"
        id="categories"
        sortby="value"
      />
    );
  }
}

CategorySettings.propTypes = {
  stripes: stripesShape.isRequired,
};

export default CategorySettings;
