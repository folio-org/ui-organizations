import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getFormSyncErrors } from 'redux-form';
import { IfPermission } from '@folio/stripes/core';
import { Button, Row, Col, AccordionSet, Accordion, ExpandAllButton, Icon } from '@folio/stripes/components';
// Local Components
import { SummaryForm } from '../Summary';
import { ContactInformationForm } from '../ContactInformation';
import { ContactPeopleForm } from '../ContactPeople';
import { AgreementsForm } from '../Agreements';
import { VendorInformationForm } from '../VendorInformation';
import { EdiInformationForm } from '../EdiInformation';
import { InterfaceForm } from '../Interface';
import { AccountsForm } from '../Accounts';
import css from './css/FormVendor.css';

class FormVendor extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    deleteLedger: PropTypes.func,
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.object.isRequired,
    stripes: PropTypes.object
  }

  static getDerivedStateFromProps(props, state) {
    const { stripes: { store } } = props;
    const { sections } = state;
    const errorKeys = Object.keys(getFormSyncErrors('FormVendor')(store.getState()));
    const sectionErrArray = [];
    // Display error condition
    errorKeys.forEach(key => {
      if ((key === 'name' || key === 'code' || key === 'status') && (sectionErrArray.indexOf('summaryErr') === -1)) sectionErrArray.push('summaryErr');
      if ((key === 'addresses' || key === 'phoneNumbers' || key === 'email' || key === 'urls') && (sectionErrArray.indexOf('contactInfoErr') === -1)) sectionErrArray.push('contactInfoErr');
      if ((key === 'contacts') && (sectionErrArray.indexOf('contactPeopleErr') === -1)) sectionErrArray.push('contactPeopleErr');
      if ((key === 'agreements') && (sectionErrArray.indexOf('agreementsErr') === -1)) sectionErrArray.push('agreementsErr');
      if ((key === 'edi') && (sectionErrArray.indexOf('ediErr') === -1)) sectionErrArray.push('ediErr');
      if ((key === 'interfaces') && (sectionErrArray.indexOf('interfacesErr') === -1)) sectionErrArray.push('interfacesErr');
      if ((key === 'accounts') && (sectionErrArray.indexOf('accountsErr') === -1)) sectionErrArray.accountsErr = true;
    });
    // Accordion error condition
    if (errorKeys.length > 0) {
      const newSections = { ...sections };
      errorKeys.forEach(key => {
        if (key === 'name' || key === 'code' || key === 'status') newSections.summarySection = true;
        if (key === 'addresses' || key === 'phoneNumbers' || key === 'email' || key === 'urls') newSections.contactInformationSection = true;
        if (key === 'contacts') newSections.contactPeopleSection = true;
        if (key === 'agreements') newSections.agreementsSection = true;
        if (key === 'interfaces') newSections.interfacesSection = true;
        if (key === 'accounts') newSections.accountsSection = true;
      });
      return { sections: newSections, sectionErrors: sectionErrArray };
    }
    return { sectionErrors: sectionErrArray };
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        summarySection: false,
        contactInformationSection: false,
        contactPeopleSection: true,
        agreementsSection: false,
        vendorInformationSection: false,
        EDIInformationSection: false,
        interfacesSection: false,
        accountsSection: false
      },
      sectionErrors: []
    };
    this.deleteVendor = this.deleteVendor.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !curState.sections[id];
      return newState;
    });
  }

  handleExpandAll(obj) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = obj;
      return newState;
    });
  }

  deleteVendor(ID) {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: ID }).then(() => {
      parentMutator.query.update({
        _path: '/organizations',
        layer: null
      });
    });
  }

  render() {
    const { initialValues } = this.props;
    const { sectionErrors } = this.state;
    const showDeleteButton = initialValues.id || false;
    // Errors
    const message = (
      <em className={css.requiredIcon} style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
        <Icon icon="validation-error" size="medium" />
        {<FormattedMessage id="ui-organizations.edit.requiredFields" />}
      </em>
    );

    const isDisplayError = (sectionName) => {
      return sectionErrors.indexOf(sectionName) > -1 ? message : null;
    };

    return (
      <div id="form-add-new-vendor">
        <Row center="xs" style={{ textAlign: 'left' }}>
          <Col xs={12} md={8}>
            <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
          </Col>
          <Col xs={12} md={8}>
            <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
              <Accordion label={<FormattedMessage id="ui-organizations.summary" />} id="summarySection" displayWhenClosed={isDisplayError('summaryErr')} displayWhenOpen={isDisplayError('summaryErr')}>
                <SummaryForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.contactInformation" />} id="contactInformationSection" displayWhenClosed={isDisplayError('contactInfoErr')} displayWhenOpen={isDisplayError('contactInfoErr')}>
                <ContactInformationForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.contactPeople" />} id="contactPeopleSection" displayWhenClosed={isDisplayError('contactPeopleErr')} displayWhenOpen={isDisplayError('contactPeopleErr')}>
                <ContactPeopleForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.agreements" />} id="agreementsSection" displayWhenClosed={isDisplayError('agreementsErr')} displayWhenOpen={isDisplayError('agreementsErr')}>
                <AgreementsForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.vendorInformation" />} id="vendorInformationSection">
                <VendorInformationForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.ediInformation" />} id="EDIInformationSection" displayWhenClosed={isDisplayError('ediErr')} displayWhenOpen={isDisplayError('ediErr')}>
                <EdiInformationForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.interface" />} id="interfacesSection" displayWhenClosed={isDisplayError('interfacesErr')} displayWhenOpen={isDisplayError('interfacesErr')}>
                <InterfaceForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.accounts" />} id="accountsSection" displayWhenClosed={isDisplayError('accountsErr')} displayWhenOpen={isDisplayError('accountsErr')}>
                <AccountsForm {...this.props} />
              </Accordion>
            </AccordionSet>
            <IfPermission perm="organizations-storage.organizations.item.delete">
              <Row end="xs">
                <Col xs={12}>
                  {
                    showDeleteButton &&
                    <Button type="button" buttonStyle="danger" onClick={() => { this.deleteVendor(this.props.initialValues.id); }}>
                      {<FormattedMessage id="ui-organizations.edit.delete" />}
                      &nbsp;
                      <strong><i>{this.props.initialValues.name}</i></strong>
                    </Button>
                  }
                </Col>
              </Row>
            </IfPermission>
          </Col>
        </Row>
      </div>

    );
  }
}
export default FormVendor;
