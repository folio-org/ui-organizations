import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  currenciesByCode,
  KeyValue,
  Checkbox,
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
          {PAYMENT_METHOD_LABELS[paymentMethod]}
        </KeyValue>
      </Col>

      <Col
        xs={3}
        data-test-vendor-currencies
      >
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.vendorCurrencies" />}
          value={vendorCurrenciesString}
        />
      </Col>

      <Col xs={12}>
        <hr />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.claimingInterval" />}
          value={claimingInterval}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.discountPercent" />}
          value={discountPercent}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedActivationInterval" />}
          value={expectedActivationInterval}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedInvoiceInterval" />}
          value={expectedInvoiceInterval}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.expectedReceiptInterval" />}
          value={expectedReceiptInterval}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.renewalActivationInterval" />}
          value={renewalActivationInterval}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.subscriptionInterval" />}
          value={subscriptionInterval}
        />
      </Col>

      <Col xs={12}>
        <hr />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.taxID" />}
          value={taxId}
        />
      </Col>

      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-organizations.vendorInfo.taxPercentage" />}
          value={taxPercentage}
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
  claimingInterval: PropTypes.string,
  discountPercent: PropTypes.string,
  expectedActivationInterval: PropTypes.string,
  expectedInvoiceInterval: PropTypes.string,
  expectedReceiptInterval: PropTypes.string,
  renewalActivationInterval: PropTypes.string,
  subscriptionInterval: PropTypes.string,
  taxId: PropTypes.string,
  taxPercentage: PropTypes.string,
  isLiableForVat: PropTypes.bool,
};

OrganizationVendorInfo.defaultProps = {
  vendorCurrencies: [],
};

export default OrganizationVendorInfo;
