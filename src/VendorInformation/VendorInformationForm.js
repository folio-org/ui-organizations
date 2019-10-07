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
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <FieldSelect
                label={<FormattedMessage id="ui-organizations.vendorInfo.paymentMethod" />}
                name="paymentMethod"
                dataOptions={PAYMENT_METHOD_OPTIONS}
              />
            </Col>
            <Col xs={12}>
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
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-organizations.vendorInfo.claimingInterval" />}
                name="claimingInterval"
                type="number"
                component={TextField}
                fullWidth
              />
            </Col>
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-organizations.vendorInfo.discountPercent" />}
                name="discountPercent"
                component={TextField}
                fullWidth
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.expectedActivationInterval" />} name="expectedActivationInterval" id="expectedActivationInterval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.expectedInvoiceInterval" />} name="expectedInvoiceInterval" id="expectedInvoiceInterval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.expectedReceiptInterval" />} name="expectedReceiptInterval" id="expectedReceiptInterval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.renewalActivationInterval" />} name="renewalActivationInterval" id="renewalActivationInterval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.subscriptionInterval" />} name="subscriptionInterval" id="subscriptionInterval" type="number" component={TextField} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Col xs={12}>
            <br />
            <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSection}>
              <Accordion label="Tax" id="taxSection">
                <Row>
                  <Col xs={12} md={4}>
                    <Field label={<FormattedMessage id="ui-organizations.vendorInfo.taxID" />} name="taxId" id="taxId" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12} md={4}>
                    <Field label={<FormattedMessage id="ui-organizations.vendorInfo.taxPercentage" />} name="taxPercentage" id="taxPercentage" type="number" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12} md={4} style={{ paddingTop: '20px' }}>
                    <Field label={<FormattedMessage id="ui-organizations.vendorInfo.liableForVAT" />} name="liableForVat" id="liableForVat" component={Checkbox} inline={false} />
                  </Col>
                </Row>
              </Accordion>
            </AccordionSet>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default VendorInformationForm;
