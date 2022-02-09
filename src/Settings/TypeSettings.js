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
      name: <FormattedMessage id="ui-organizations.settings.name" />,
      status: <FormattedMessage id="ui-organizations.settings.status" />,
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
        baseUrl="organizations-storage/organization-types"
        records="organizationTypes"
        label={<FormattedMessage id="ui-organizations.settings.types" />}
        labelSingular={<FormattedMessage id="ui-organizations.settings.type" />}
        objectLabel={<FormattedMessage id="ui-organizations.settings.types" />}
        visibleFields={['name', 'status']}
        columnMapping={columnMapping}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        nameKey="types"
        id="types"
        sortby="name"
        actionProps={actionProps}
      />
    );
  }
}

TypeSettings.propTypes = {
  stripes: stripesShape.isRequired,
};

export default TypeSettings;
