import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const EdiView = ({
  vendorEdiOrdersExportConfig = {},
  acqMethods = [],
}) => {
  const defaultAcquisitionMethodsOptions = useMemo(() => {
    const defaultAcquisitionMethods = vendorEdiOrdersExportConfig.ediConfig?.defaultAcquisitionMethods || [];

    return acqMethods
      .filter(({ id }) => defaultAcquisitionMethods.includes(id))
      .map(({ value }) => value)
      .join(', ');
  }, [vendorEdiOrdersExportConfig.ediConfig?.defaultAcquisitionMethods, acqMethods]);

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
              <KeyValue
                label={<FormattedMessage id="ui-organizations.integration.edi.accountNumbers" />}
                value={vendorEdiOrdersExportConfig.ediConfig?.accountNoList?.join(', ')}
              />
            </Col>
          )
        }

        <Col
          data-test-edi-acq-methods
          xs={6}
          md={3}
        >
          <KeyValue
            label={<FormattedMessage id="ui-organizations.integration.edi.defaultAcquisitionMethods" />}
            value={defaultAcquisitionMethodsOptions}
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
};

export default EdiView;
