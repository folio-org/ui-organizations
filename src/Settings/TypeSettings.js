import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { stripesShape } from '@folio/stripes/core';
import { Select } from '@folio/stripes/components';
import { ControlledVocab } from '@folio/stripes/smart-components';
import TypeStatus from '../Utils/TypeStatus';

class TypeSettings extends Component {
  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { stripes } = this.props;
    const columnMapping = {
      name: <FormattedMessage id="ui-organizations.settings.type.name" />,
      status: <FormattedMessage id="ui-organizations.settings.type.status" />,
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

    const fieldComponents = {
      'status': ({ fieldProps }) => (
        <Field
          component={Select}
          dataOptions={TypeStatus}
          placeholder=" "
          {...fieldProps}
        />
      ),
    };

    const setRequiredValidation = (values) => {
      const errors = {};

      if (!values.status) {
        errors.status = <FormattedMessage id="stripes-core.label.missingRequiredField" />;
      }

      return errors;
    };

    return (
      <this.connectedControlledVocab
        actionProps={actionProps}
        baseUrl="organizations-storage/organization-types"
        columnMapping={columnMapping}
        fieldComponents={fieldComponents}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        id="types"
        label={<FormattedMessage id="ui-organizations.settings.types" />}
        labelSingular={<FormattedMessage id="ui-organizations.settings.type" />}
        nameKey="types"
        objectLabel={<FormattedMessage id="ui-organizations.settings.types" />}
        records="organizationTypes"
        sortby="name"
        stripes={stripes}
        validate={setRequiredValidation}
        visibleFields={['name', 'status']}
      />
    );
  }
}

TypeSettings.propTypes = {
  stripes: stripesShape.isRequired,
};

export default TypeSettings;
