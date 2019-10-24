import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { find } from 'lodash';

import {
  Checkbox,
  TextField,
  AccordionSet,
  Accordion,
  Row,
  Col,
  currenciesOptions,
} from '@folio/stripes/components';
import {
  FieldMultiSelection,
  FieldSelect,
  PAYMENT_METHOD_OPTIONS,
} from '@folio/stripes-acq-components';

import css from './VendorInformationForm.css';

const currencyValueOptions = currenciesOptions.map(({ value }) => value);
const currencyToString = item => item;
const currencyFormatter = ({ option }) => {
  const item = find(currenciesOptions, { value: option }) || option;

  if (!item) return option;

  return item.label;
};
const currencyFilter = (filterText) => {
  const lowerFilterText = (filterText || '').toLowerCase();
  const renderedItems = filterText
    ? currenciesOptions
      .filter(item => item.label.toLowerCase().includes(lowerFilterText))
      .map(({ value }) => value)
    : currencyValueOptions;

  return { renderedItems };
};

class VendorInformationForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired,
    }),
    stripes: PropTypes.shape({
      store: PropTypes.object,
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        taxSection: true,
      },
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onChangeSelect = (e, propertyName) => {
    const { dispatch, change } = this.props;

    dispatch(change(`${propertyName}`, e));
  };

  render() {
    return (
      <Row className={css.vendorInfo}>
        <Col xs={12}>
          <Row>
            <Col
              data-test-payment-method
              xs={6}
              md={3}
            >
              <FieldSelect
                dataOptions={PAYMENT_METHOD_OPTIONS}
                label={<FormattedMessage id="ui-organizations.vendorInfo.paymentMethod" />}
                name="paymentMethod"
              />
            </Col>
            <Col
              data-test-currency
              xs={6}
              md={3}
            >
              <FieldMultiSelection
                label={<FormattedMessage id="ui-organizations.vendorInfo.vendorCurrencies" />}
                name="vendorCurrencies"
                dataOptions={currencyValueOptions}
                formatter={currencyFormatter}
                itemToString={currencyToString}
                filter={currencyFilter}
                onChange={(e) => this.onChangeSelect(e, 'vendorCurrencies')}
              />
            </Col>
            <Col
              data-test-activation-interval
              xs={6}
              md={3}
            >
              <Field
                component={TextField}
                fullWidth
                id="expectedActivationInterval"
                label={<FormattedMessage id="ui-organizations.vendorInfo.expectedActivationInterval" />}
                name="expectedActivationInterval"
                type="number"
              />
            </Col>
            <Col
              data-test-invoice-interval
              xs={6}
              md={3}
            >
              <Field
                component={TextField}
                fullWidth
                id="expectedInvoiceInterval"
                label={<FormattedMessage id="ui-organizations.vendorInfo.expectedInvoiceInterval" />}
                name="expectedInvoiceInterval"
                type="number"
              />
            </Col>
            <Col
              data-test-claiming-interval
              xs={6}
              md={3}
            >
              <Field
                component={TextField}
                fullWidth
                label={<FormattedMessage id="ui-organizations.vendorInfo.claimingInterval" />}
                name="claimingInterval"
                type="number"
              />
            </Col>
            <Col
              data-test-receipt-interval
              xs={6}
              md={3}
            >
              <Field
                component={TextField}
                fullWidth
                id="expectedReceiptInterval"
                label={<FormattedMessage id="ui-organizations.vendorInfo.expectedReceiptInterval" />}
                name="expectedReceiptInterval"
                type="number"
              />
            </Col>
            <Col
              data-test-discount-percent
              xs={6}
              md={3}
            >
              <Field
                label={<FormattedMessage id="ui-organizations.vendorInfo.discountPercent" />}
                name="discountPercent"
                component={TextField}
                fullWidth
              />
            </Col>
            <Col
              data-test-reneval-interval
              xs={6}
              md={3}
            >
              <Field
                component={TextField}
                fullWidth
                id="renewalActivationInterval"
                label={<FormattedMessage id="ui-organizations.vendorInfo.renewalActivationInterval" />}
                name="renewalActivationInterval"
                type="number"
              />
            </Col>
            <Col
              data-test-subscription-interval
              xs={6}
              md={3}
            >
              <Field
                component={TextField}
                fullWidth
                id="subscriptionInterval"
                label={<FormattedMessage id="ui-organizations.vendorInfo.subscriptionInterval" />}
                name="subscriptionInterval"
                type="number"
              />
            </Col>
          </Row>
        </Col>

        <Col xs={12}>
          <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSection}>
            <Accordion label="Tax" id="taxSection">
              <Row>
                <Col
                  data-test-tax-id
                  xs={6}
                  md={3}
                >
                  <Field
                    component={TextField}
                    fullWidth
                    id="taxId"
                    label={<FormattedMessage id="ui-organizations.vendorInfo.taxID" />}
                    name="taxId"
                  />
                </Col>
                <Col
                  data-test-tax-percentage
                  xs={6}
                  md={3}
                >
                  <Field
                    label={<FormattedMessage id="ui-organizations.vendorInfo.taxPercentage" />}
                    name="taxPercentage"
                    id="taxPercentage"
                    type="number"
                    component={TextField}
                    fullWidth
                  />
                </Col>
                <Col
                  data-test-liable-for-vat
                  xs={6}
                  md={3}
                >
                  <Field
                    label={<FormattedMessage id="ui-organizations.vendorInfo.liableForVAT" />}
                    name="liableForVat"
                    id="liableForVat"
                    component={Checkbox}
                    vertical
                  />
                </Col>
              </Row>
            </Accordion>
          </AccordionSet>
        </Col>
      </Row>
    );
  }
}

export default VendorInformationForm;
