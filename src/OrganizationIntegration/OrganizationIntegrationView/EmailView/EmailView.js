import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

export const EmailView = ({ ediEmail = {} }) => {
  return (
    <Accordion
      id="email"
      label={<FormattedMessage id="ui-organizations.integration.email" />}
    >
      <Row>
        <Col
          data-test-email-address
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.email.emailAddress" />}
            value={ediEmail.emailAddress}
          />
        </Col>
        <Col
          data-test-email-template
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.email.emailTemplate" />}
            value={ediEmail.emailTemplate}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

EmailView.propTypes = {
  ediEmail: PropTypes.object,
};
