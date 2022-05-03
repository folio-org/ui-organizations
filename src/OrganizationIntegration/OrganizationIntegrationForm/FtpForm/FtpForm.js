import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Col,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import {
  validateRequired,
  validateURLRequired,
} from '@folio/stripes-acq-components';

import {
  Credentials,
  CredentialsField,
} from '../../../common/components';
import {
  FTP_TYPES,
  TRANSMISSION_MODES,
  CONNECTION_MODES,
} from '../../constants';

export const FtpForm = () => {
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
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpFormat" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.ftpFormat"
            component={Select}
            dataOptions={FTP_TYPES}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col
          data-test-ftp-mode
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpMode" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.ftpMode"
            component={Select}
            dataOptions={TRANSMISSION_MODES}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col
          data-test-server-address
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.serverAddress" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.serverAddress"
            type="text"
            validate={validateURLRequired}
            component={TextField}
            fullWidth
            required
            validateFields={[]}
          />
        </Col>
        <Col
          data-test-ftp-connection-mode
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpConnectionMode" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.ftpConnMode"
            component={Select}
            dataOptions={CONNECTION_MODES}
            fullWidth
            validateFields={[]}
          />
        </Col>
      </Row>
      <Credentials perm="ui-organizations.integrations.creds.edit">
        {(renderToggle, hasCredsPerm) => (
          <Row>
            <Col
              data-test-username
              xs={6}
              md={3}
            >
              <CredentialsField
                label={<FormattedMessage id="ui-organizations.integration.ftp.username" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.username"
                validateFields={[]}
              />
            </Col>
            <Col
              data-test-password
              xs={6}
              md={3}
            >
              <CredentialsField
                autoComplete="new-password"
                label={<FormattedMessage id="ui-organizations.edit.password" />}
                name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.password"
              />
            </Col>
            {hasCredsPerm && (
              <Col
                xs={6}
                md={3}
              >
                {renderToggle()}
              </Col>
            )}
          </Row>
        )}
      </Credentials>
      <Row>
        <Col
          data-test-ftp-port
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.ftpPort" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.ftpPort"
            type="number"
            component={TextField}
            fullWidth
            required
            validateFields={[]}
            validate={validateRequired}
          />
        </Col>
        <Col
          data-test-order-directory
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.orderDirectory" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.orderDirectory"
            type="text"
            component={TextField}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col
          data-test-invoice-directory
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.invoiceDirectory" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.invoiceDirectory"
            type="text"
            component={TextField}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col
          data-test-notes
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.ftp.notes" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediFtp.notes"
            component={TextArea}
            fullWidth
            validateFields={[]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};
