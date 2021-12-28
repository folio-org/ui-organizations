import React from 'react';
import PropTypes from 'prop-types';
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

export const IntegrationInfoForm = ({ defaultIntegration }) => {
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
            disabled={Boolean(defaultIntegration)}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

IntegrationInfoForm.propTypes = {
  defaultIntegration: PropTypes.object,
};
