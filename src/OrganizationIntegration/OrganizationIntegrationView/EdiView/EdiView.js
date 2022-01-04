import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Checkbox,
  Col,
  KeyValue,
  Row,
  Select,
} from '@folio/stripes/components';
import {
  getAccountOptions,
  getAcqMethodOptions,
} from '../../utils';

const EdiView = ({
  vendorEdiOrdersExportConfig = {},
  acqMethods = [],
  accounts = [],
}) => {
  const acqMethodOptions = useMemo(() => getAcqMethodOptions(acqMethods), [acqMethods]);
  const accountOptions = useMemo(() => getAccountOptions(accounts), [accounts]);

  const isDefaultConfig = vendorEdiOrdersExportConfig?.isDefaultConfig;

  return (
    <Accordion
      id="edi"
      label={<FormattedMessage id="ui-organizations.integration.edi" />}
    >
      <Row>
        {
          !isDefaultConfig && (
            <Col
              data-test-edi-account-numbers
              xs={6}
              md={3}
            >
              <Select
                label={<FormattedMessage id="ui-organizations.integration.edi.accountNumbers" />}
                dataOptions={accountOptions}
                fullWidth
                multiple
                disabled
                value={vendorEdiOrdersExportConfig.ediConfig?.accountNoList}
              />
            </Col>
          )
        }

        <Col
          data-test-edi-acq-methods
          xs={6}
          md={3}
        >
          <Select
            label={<FormattedMessage id="ui-organizations.integration.edi.defaultAcquisitionMethods" />}
            dataOptions={acqMethodOptions}
            fullWidth
            multiple
            disabled
            value={vendorEdiOrdersExportConfig.ediConfig?.defaultAcquisitionMethods}
          />
        </Col>

        <Col
          data-test-vendor-edi-code
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.edi.vendorEDICode" />}
            value={vendorEdiOrdersExportConfig.ediConfig?.vendorEdiCode}
          />
        </Col>

        <Col
          data-test-vendor-edi-type
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.edi.vendorEDIType" />}
            value={vendorEdiOrdersExportConfig.ediConfig?.vendorEdiType}
          />
        </Col>

        <Col
          data-test-library-edi-code
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.edi.libraryEDICode" />}
            value={vendorEdiOrdersExportConfig.ediConfig?.libEdiCode}
          />
        </Col>

        <Col
          data-test-library-edi-type
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.edi.libraryEDIType" />}
            value={vendorEdiOrdersExportConfig.ediConfig?.libEdiType}
          />
        </Col>

        <Col
          data-test-edi-naming-convention
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.edi.ediNamingConvention" />}
            value={vendorEdiOrdersExportConfig.ediConfig?.ediNamingConvention}
          />
        </Col>

        <Col
          data-test-send-acc-number
          xs={6}
          md={3}
        >
          <Checkbox
            label={<FormattedMessage id="ui-organizations.integration.edi.sendAccountNumber" />}
            checked={vendorEdiOrdersExportConfig.ediConfig?.sendAccountNumber}
            vertical
            disabled
          />
        </Col>

        <Col
          data-test-notifications-orders
          xs={6}
          md={3}
        >
          <Checkbox
            label={<FormattedMessage id="ui-organizations.integration.edi.orders" />}
            checked={vendorEdiOrdersExportConfig.ediConfig?.supportOrder}
            vertical
            disabled
          />
        </Col>

        <Col
          data-test-notifications-invoices
          xs={6}
          md={3}
        >
          <Checkbox
            label={<FormattedMessage id="ui-organizations.integration.edi.invoices" />}
            checked={vendorEdiOrdersExportConfig.ediConfig?.supportInvoice}
            vertical
            disabled
          />
        </Col>

        <Col
          data-test-notes
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.edi.notes" />}
            value={vendorEdiOrdersExportConfig.ediConfig?.notes}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

EdiView.propTypes = {
  vendorEdiOrdersExportConfig: PropTypes.object,
  acqMethods: PropTypes.arrayOf(PropTypes.object),
  accounts: PropTypes.arrayOf(PropTypes.string),
};

export default EdiView;
