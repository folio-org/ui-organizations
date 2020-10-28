import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  currenciesByCode,
  KeyValue,
  Checkbox,
  NoValue,
} from '@folio/stripes/components';
import { PAYMENT_METHOD_LABELS } from '@folio/stripes-acq-components';

const OrganizationVendorInfo = ({
  paymentMethod,
  vendorCurrencies,
  claimingInterval,
  discountPercent,
  expectedActivationInterval,
  expectedInvoiceInterval,
  expectedReceiptInterval,
  renewalActivationInterval,
  subscriptionInterval,
  taxId,
  taxPercentage,
  isLiableForVat,
  isExportToAccounting,
}) => {
  const vendorCurrenciesString = vendorCurrencies
    .map(currency => {
      const currencyInfo = currenciesByCode[currency];

      return currencyInfo ? `${currencyInfo.currency} (${currencyInfo.code})` : currency;
    })
    .join(', ');

  return (
    <Row>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}>
          {PAYMENT_METHOD_LABELS[paymentMethod] || <NoValue />}
        </KeyValue>
      </Col>

      <Col
        xs={3}
        data-test-vendor-currencies
      >
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.vendorCurrencies" />}
          value={vendorCurrenciesString || <NoValue />}
        />
      </Col>

      <Col xs={12}>
        <hr />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.claimingInterval" />}
          value={claimingInterval ?? <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.discountPercent" />}
          value={discountPercent ?? <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedActivationInterval" />}
          value={expectedActivationInterval ?? <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedInvoiceInterval" />}
          value={expectedInvoiceInterval ?? <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedReceiptInterval" />}
          value={expectedReceiptInterval ?? <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.renewalActivationInterval" />}
          value={renewalActivationInterval ?? <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.subscriptionInterval" />}
          value={subscriptionInterval ?? <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <Checkbox
          checked={isExportToAccounting}
          disabled
          label={<FormattedMessage id="ui-organizations.vendorInfo.exportToAccounting" />}
          vertical
        />
      </Col>

      <Col xs={12}>
        <hr />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.taxID" />}
          value={taxId || <NoValue />}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.taxPercentage" />}
          value={taxPercentage ?? <NoValue />}
        />
      </Col>

      <Col xs={4}>
        <Checkbox
          checked={isLiableForVat}
          disabled
          label={<FormattedMessage id="ui-organizations.vendorInfo.liableForVAT" />}
          vertical
        />
      </Col>
    </Row>
  );
};

OrganizationVendorInfo.propTypes = {
  paymentMethod: PropTypes.string,
  vendorCurrencies: PropTypes.arrayOf(PropTypes.string),
  claimingInterval: PropTypes.number,
  discountPercent: PropTypes.number,
  expectedActivationInterval: PropTypes.number,
  expectedInvoiceInterval: PropTypes.number,
  expectedReceiptInterval: PropTypes.number,
  renewalActivationInterval: PropTypes.number,
  subscriptionInterval: PropTypes.number,
  taxId: PropTypes.string,
  taxPercentage: PropTypes.number,
  isLiableForVat: PropTypes.bool,
  isExportToAccounting: PropTypes.bool,
};

OrganizationVendorInfo.defaultProps = {
  vendorCurrencies: [],
  isExportToAccounting: false,
};

export default OrganizationVendorInfo;
