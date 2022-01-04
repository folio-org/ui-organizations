import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const FtpView = ({ ediFtp = {} }) => {
  return (
    <Accordion
      id="ftp"
      label={<FormattedMessage id="ui-organizations.integration.ftp" />}
    >
      <Row>
        <Col
          data-test-edit-ftp
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpFormat" />}
            value={ediFtp.ftpFormat}
          />
        </Col>
        <Col
          data-test-ftp-mode
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpMode" />}
            value={ediFtp.ftpMode}
          />
        </Col>
        <Col
          data-test-server-address
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.serverAddress" />}
            value={ediFtp.serverAddress}
          />
        </Col>
        <Col
          data-test-ftp-connection-mode
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpConnectionMode" />}
            value={ediFtp.ftpConnMode}
          />
        </Col>
      </Row>
      <Row>
        <Col
          data-test-username
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.username" />}
            value={ediFtp.username}
          />
        </Col>
        <Col
          data-test-password
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.password" />}
            value={ediFtp.password}
          />
        </Col>
        <Col
          data-test-ftp-port
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpPort" />}
            value={ediFtp.ftpPort}
          />
        </Col>
        <Col
          data-test-order-directory
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.orderDirectory" />}
            value={ediFtp.orderDirectory}
          />
        </Col>
      </Row>
      <Row>
        <Col
          data-test-invoice-directory
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.invoiceDirectory" />}
            value={ediFtp.invoiceDirectory}
          />
        </Col>
        <Col
          data-test-notes
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.ftp.notes" />}
            value={ediFtp.notes}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

FtpView.propTypes = {
  ediFtp: PropTypes.object,
};

export default FtpView;
