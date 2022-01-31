import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { stripesShape } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';

class TypeSettings extends Component {
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
    const getDisableAttr = () => ({
      disabled: !stripes.hasPerm('ui-organizations.settings'),
    });
    const actionProps = {
      create: getDisableAttr,
      edit: getDisableAttr,
      delete: getDisableAttr,
    };

    return (
      <this.connectedControlledVocab
        stripes={stripes}
        baseUrl="organizations-storage/types"
        records="types"
        label={<FormattedMessage id="ui-organizations.settings.types" />}
        labelSingular={<FormattedMessage id="ui-organizations.settings.type" />}
        objectLabel={<FormattedMessage id="ui-organizations.settings.types" />}
        visibleFields={['value']}
        columnMapping={columnMapping}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        nameKey="types"
        id="types"
        sortby="value"
        actionProps={actionProps}
      />
    );
  }
}

TypeSettings.propTypes = {
  stripes: stripesShape.isRequired,
};

export default TypeSettings;
