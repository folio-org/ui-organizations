import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, toString } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import css from './VendorInformationView.css';
import { PrintKeyValue, PrintBoolToCheckbox } from '../Utils/PrintKeyValue';

class VendorInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues !== null ? initialValues : false;
    const vendorCurrencies = dataVal.vendorCurrencies.join(', ') || null;

    if (dataVal) {
      return (
        <Row className={css.horizontalLine}>
          {PrintKeyValue('ui-organizations.vendorInfo.paymentMethod', get(dataVal, 'paymentMethod'), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.vendorCurrencies', vendorCurrencies, 3, false)}
          <Col xs={12}>
            <hr />
          </Col>
          {PrintKeyValue('ui-organizations.vendorInfo.claimingInterval', toString(get(dataVal, ['claimingInterval'])), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.discountPercent', toString(get(dataVal, ['discountPercent'])), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.expectedActivationInterval', toString(get(dataVal, ['expectedActivationInterval'])), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.expectedInvoiceInterval', toString(get(dataVal, ['expectedInvoiceInterval'])), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.expectedReceiptInterval', toString(get(dataVal, ['expectedReceiptInterval'])), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.renewalActivationInterval', toString(get(dataVal, ['renewalActivationInterval'])), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.subscriptionInterval', toString(get(dataVal, ['subscriptionInterval'])), 3, false)}
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.vendorInfo.tax" />}</div>
          </Col>
          {PrintKeyValue('ui-organizations.vendorInfo.taxID', toString(get(dataVal, ['taxId'])), 3, false)}
          {PrintKeyValue('ui-organizations.vendorInfo.taxPercentage', toString(get(dataVal, ['taxPercentage'])), 3, false)}
          {PrintBoolToCheckbox('ui-organizations.vendorInfo.liableForVAT', !!get(dataVal, ['liableForVat']), 3)}
        </Row>
      );
    } else {
      return (
        <div>
          <p>{<FormattedMessage id="ui-organizations.vendorInfo.noInformationAvailable" />}</p>
        </div>
      );
    }
  }
}

export default VendorInformationView;
