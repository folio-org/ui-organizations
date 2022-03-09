import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import { Field } from 'redux-form';

import { stripesShape } from '@folio/stripes/core';
import { Select } from '@folio/stripes/components';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { typeStatus } from './typeStatus';

class TypeSettings extends Component {
  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  getDataOptions(field) {
    return field.map((item) => ({
      label: this.props.intl.formatMessage({ id: `ui-organizations.settings.typeStatus.${item.value}` }),
      value: item.value,
    }));
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
          dataOptions={this.getDataOptions(typeStatus)}
          id="select-type-status"
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
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};

export default injectIntl(TypeSettings);
