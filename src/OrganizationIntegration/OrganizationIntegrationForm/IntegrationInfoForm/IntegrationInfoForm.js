import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Checkbox,
  Col,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import {
  validateRequired,
} from '@folio/stripes-acq-components';

// TODO: check isDefault in existing configs

export const IntegrationInfoForm = () => {
  return (
    <Accordion
      id="integrationInfo"
      label={<FormattedMessage id="ui-organizations.integration.info" />}
    >
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.integration.info.configName" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.configName"
            required
            validate={validateRequired}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextArea}
            fullWidth
            label={<FormattedMessage id="ui-organizations.integration.info.configDescription" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.configDescription"
          />
        </Col>

        <Col xs={3}>
          <Field
            component={Checkbox}
            type="checkbox"
            fullWidth
            label={<FormattedMessage id="ui-organizations.integration.info.isDefaultConfig" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.isDefaultConfig"
            vertical
          />
        </Col>
      </Row>
    </Accordion>
  );
};
