import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Select, Checkbox, TextField, AccordionSet, Accordion, Row, Col } from '@folio/stripes/components';
import css from './VendorInformationForm.css';
import { getDropDownItems } from '../common/utils/dropdown';

class VendorInformationForm extends Component {
  static propTypes = {
    dropdownCurrencies: PropTypes.arrayOf(PropTypes.string),
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    }),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        taxSection: true,
      }
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.selectedValues = this.selectedValues.bind(this);
  }

  onChangeSelect = (e, propertyName) => {
    const { dispatch, change } = this.props;
    dispatch(change(`${propertyName}`, e));
  };

  selectedValues = (propertyName) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const currValues = formValues[propertyName];
    return currValues;
  };

  // For Multi dropdown
  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
    return { renderedItems };
  };

  render() {
    const { parentResources, dropdownCurrencies } = this.props;
    const paymentMethodDD = getDropDownItems(parentResources, 'paymentMethodDD', false);

    return (
      <Row className={css.vendorInfo}>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-organizations.vendorInfo.paymentMethod" />}
                name="paymentMethod"
                component={Select}
                dataOptions={paymentMethodDD}
                fullWidth
              />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.accessProvider" />} name="accessProvider" id="accessProvider" component={Checkbox} />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.governmental" />} name="governmental" id="governmental" component={Checkbox} />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.licensor" />} name="licensor" id="licensor" component={Checkbox} />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.materialSupplier" />} name="materialSupplier" id="materialSupplier" component={Checkbox} />
            </Col>
            <Col xs={12}>
              <Field
                component={MultiSelection}
                label={<FormattedMessage id="ui-organizations.vendorInfo.vendorCurrencies" />}
                name="vendorCurrencies"
                dataOptions={dropdownCurrencies}
                style={{ height: '80px' }}
                value={this.selectedValues('vendorCurrencies')}
                itemToString={this.toString}
                formatter={this.formatter}
                filter={this.filterItems}
                onChange={(e) => this.onChangeSelect(e, 'vendorCurrencies')}
                onBlur={(e) => { e.preventDefault(); }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.claimingInterval" />} name="claimingInterval" id="claimingInterval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label={<FormattedMessage id="ui-organizations.vendorInfo.discountPercent" />} name="discountPercent" id="discountPercent" component={TextField} fullWidth />
            </Col>
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
