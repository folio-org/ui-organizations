import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  stripesConnect,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import { Col, RadioButton, Row } from '@folio/stripes/components';

const ConnectedConfigManager = stripesConnect(ConfigManager);

const NumberGeneratorOptions = (props) => {
  const beforeSave = (data) => {
    return JSON.stringify(data);
  };

  const getInitialValues = (settings) => {
    let loadedValues = {};

    try {
      const value = settings.length === 0 ? '' : settings[0].value;

      loadedValues = JSON.parse(value);
    } catch (e) {
      // Make sure we return _something_ because ConfigManager no longer has a safety check here
      return {};
    }

    return {
      ...loadedValues,
    };
  };

  return (
    <ConnectedConfigManager
      configName="number_generator"
      getInitialValues={getInitialValues}
      formType="final-form"
      label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions" />}
      moduleName="ORGANIZATIONS"
      onBeforeSave={beforeSave}
      stripes={props.stripes}
    >
      <Row>
        <Col xs={12}>
          <Field
            component={RadioButton}
            id="useTextField"
            name="vendorGeneratorSetting"
            label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.useTextFieldForVendor" />}
            type="radio"
            value="useTextField"
          />
          <Field
            component={RadioButton}
            id="useBoth"
            name="vendorGeneratorSetting"
            label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.useBothForVendor" />}
            type="radio"
            value="useBoth"
          />
          <Field
            component={RadioButton}
            id="useGenerator"
            name="vendorGeneratorSetting"
            label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.useGeneratorForVendor" />}
            type="radio"
            value="useGenerator"
          />
        </Col>
      </Row>
    </ConnectedConfigManager>
  );
};

NumberGeneratorOptions.propTypes = {
  stripes: PropTypes.object,
};

export default withStripes(NumberGeneratorOptions);
