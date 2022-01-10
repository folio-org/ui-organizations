import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const IntegrationInfoView = ({ integrationConfig = {} }) => {
  return (
    <Accordion
      id="integrationInfo"
      label={<FormattedMessage id="ui-organizations.integration.info" />}
    >
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.info.configName" />}
            value={integrationConfig.configName}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.info.configDescription" />}
            value={integrationConfig.configDescription}
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            label={<FormattedMessage id="ui-organizations.integration.info.isDefaultConfig" />}
            checked={integrationConfig.isDefaultConfig}
            vertical
            disabled
          />
        </Col>
      </Row>
    </Accordion>
  );
};

IntegrationInfoView.propTypes = {
  integrationConfig: PropTypes.object,
};

export default IntegrationInfoView;
