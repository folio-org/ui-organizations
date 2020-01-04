import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  currenciesByCode,
  KeyValue,
} from '@folio/stripes/components';
import { PAYMENT_METHOD_LABELS } from '@folio/stripes-acq-components';

import { PrintKeyValue, PrintBoolToCheckbox } from '../../../Utils/PrintKeyValue';
import css from './OrganizationVendorInfo.css';

const OrganizationVendorInfo = ({ organization }) => {
  if (!organization) {
    return null;
  }

  const {
    paymentMethod = '',
    vendorCurrencies = [],
    claimingInterval = '',
    discountPercent = '',
    expectedActivationInterval = '',
    expectedInvoiceInterval = '',
    expectedReceiptInterval = '',
    renewalActivationInterval = '',
    subscriptionInterval = '',
    taxId = '',
    taxPercentage = '',
    liableForVat,
  } = organization;
  const vendorCurrenciesString = vendorCurrencies
    .map(currency => {
      const currencyInfo = currenciesByCode[currency];

      return currencyInfo ? `${currencyInfo.currency} (${currencyInfo.code})` : currency;
    })
    .join(', ');

  return (
    <Row className={css.horizontalLine}>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-organizations.accounts.paymentMethod" />}>
          {PAYMENT_METHOD_LABELS[paymentMethod]}
        </KeyValue>
      </Col>
      {PrintKeyValue('ui-organizations.vendorInfo.vendorCurrencies', vendorCurrenciesString, 3, false)}
      <Col xs={12}>
        <hr />
      </Col>
      {PrintKeyValue('ui-organizations.vendorInfo.claimingInterval', claimingInterval, 3, false)}
      {PrintKeyValue('ui-organizations.vendorInfo.discountPercent', discountPercent, 3, false)}
      {PrintKeyValue('ui-organizations.vendorInfo.expectedActivationInterval', expectedActivationInterval, 3, false)}
      {PrintKeyValue('ui-organizations.vendorInfo.expectedInvoiceInterval', expectedInvoiceInterval, 3, false)}
      {PrintKeyValue('ui-organizations.vendorInfo.expectedReceiptInterval', expectedReceiptInterval, 3, false)}
      {PrintKeyValue('ui-organizations.vendorInfo.renewalActivationInterval', renewalActivationInterval, 3, false)}
      {PrintKeyValue('ui-organizations.vendorInfo.subscriptionInterval', subscriptionInterval, 3, false)}
      <Col xs={12}>
        <hr />
      </Col>
      <Col xs={12}>
        <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.vendorInfo.tax" />}</div>
      </Col>
      {PrintKeyValue('ui-organizations.vendorInfo.taxID', taxId, 3, false)}
      {PrintKeyValue('ui-organizations.vendorInfo.taxPercentage', taxPercentage, 3, false)}
      {PrintBoolToCheckbox('ui-organizations.vendorInfo.liableForVAT', !!liableForVat, 3)}
    </Row>
  );
};

OrganizationVendorInfo.propTypes = {
  organization: PropTypes.object,
};

export default OrganizationVendorInfo;
