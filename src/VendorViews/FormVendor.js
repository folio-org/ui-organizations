import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getFormSyncErrors } from 'redux-form';

import { Row, Col, AccordionSet, Accordion, ExpandAllButton, Icon } from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import { SECTIONS } from '../common/constants';
import { SummaryForm } from '../Summary';
import { ContactInformationForm } from '../ContactInformation';
import { ContactPeopleForm } from '../ContactPeople';
import { AgreementsForm } from '../Agreements';
import { VendorInformationForm } from '../VendorInformation';
import { EdiInformationForm } from '../EdiInformation';
import { AccountsForm } from '../Accounts';
import { InterfacesListContainer } from '../Interface';

import css from './css/FormVendor.css';

class FormVendor extends Component {
  static propTypes = {
    dispatchChange: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    deleteLedger: PropTypes.func,
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.object.isRequired,
    stripes: PropTypes.object,
    isVendor: PropTypes.bool,
    language: PropTypes.string,
    dropdownCountry: PropTypes.arrayOf(PropTypes.object),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  };

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
        accountsSection: false,
      },
      sectionErrors: [],
    };
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

  render() {
    const {
      dispatchChange,
      dropdownCountry,
      dropdownLanguages,
      dropdownPhoneType,
      dropdownVendorCategories,
      initialValues,
      isVendor,
      language,
      parentMutator,
      parentResources,
      stripes,
    } = this.props;
    const { sectionErrors } = this.state;
    const { id, interfaces = [], contacts = [] } = initialValues;

    // Errors
    const message = (
      <em className={css.requiredIcon} style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
        <Icon icon="exclamation-circle" size="medium" />
        {<FormattedMessage id="ui-organizations.edit.requiredFields" />}
      </em>
    );

    const isDisplayError = (sectionName) => {
      return sectionErrors.indexOf(sectionName) > -1 ? message : null;
    };

    const metadata = _.get(initialValues, 'metadata');

    return (
      <div id="form-add-new-vendor">
        <Row center="xs" style={{ textAlign: 'left' }}>
          <Col xs={12} md={8}>
            <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
          </Col>
          <Col xs={12} md={8}>
            <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
              <Accordion label={<FormattedMessage id="ui-organizations.summary" />} id="summarySection" displayWhenClosed={isDisplayError('summaryErr')} displayWhenOpen={isDisplayError('summaryErr')}>
                {metadata && <ViewMetaData metadata={metadata} />}
                <SummaryForm {...this.props} />
              </Accordion>
              <Accordion label={<FormattedMessage id="ui-organizations.contactInformation" />} id="contactInformationSection" displayWhenClosed={isDisplayError('contactInfoErr')} displayWhenOpen={isDisplayError('contactInfoErr')}>
                <ContactInformationForm
                  defaultLanguage={language}
                  dispatchChange={dispatchChange}
                  dropdownCountry={dropdownCountry}
                  dropdownLanguages={dropdownLanguages}
                  dropdownPhoneType={dropdownPhoneType}
                  dropdownVendorCategories={dropdownVendorCategories}
                />
              </Accordion>
              <Accordion
                label={<FormattedMessage id="ui-organizations.contactPeople" />}
                id={SECTIONS.contactPeopleSection}
                displayWhenClosed={isDisplayError('contactPeopleErr')}
                displayWhenOpen={isDisplayError('contactPeopleErr')}
              >
                <ContactPeopleForm
                  orgId={id}
                  parentMutator={parentMutator}
                  parentResources={parentResources}
                  storedContactIds={contacts}
                  stripes={stripes}
                />
              </Accordion>
              <Accordion
                label={<FormattedMessage id="ui-organizations.interface" />}
                id="interfacesSection"
                displayWhenClosed={isDisplayError('interfacesErr')}
                displayWhenOpen={isDisplayError('interfacesErr')}
              >
                <InterfacesListContainer
                  orgId={id}
                  parentMutator={parentMutator}
                  parentResources={parentResources}
                  storedInterfaces={interfaces}
                />
              </Accordion>
              {
                isVendor && (
                  <Fragment>
                    <Accordion
                      label={<FormattedMessage id="ui-organizations.vendorInformation" />}
                      id="vendorInformationSection"
                    >
                      <VendorInformationForm {...this.props} />
                    </Accordion>

                    <Accordion
                      label={<FormattedMessage id="ui-organizations.vendorTerms" />}
                      id="agreementsSection"
                      displayWhenClosed={isDisplayError('agreementsErr')}
                      displayWhenOpen={isDisplayError('agreementsErr')}
                    >
                      <AgreementsForm {...this.props} />
                    </Accordion>

                    <Accordion
                      label={<FormattedMessage id="ui-organizations.ediInformation" />}
                      id="EDIInformationSection"
                      displayWhenClosed={isDisplayError('ediErr')}
                      displayWhenOpen={isDisplayError('ediErr')}
                    >
                      <EdiInformationForm {...this.props} />
                    </Accordion>

                    <Accordion
                      label={<FormattedMessage id="ui-organizations.accounts" />}
                      id="accountsSection"
                      displayWhenClosed={isDisplayError('accountsErr')}
                      displayWhenOpen={isDisplayError('accountsErr')}
                    >
                      <AccountsForm {...this.props} />
                    </Accordion>
                  </Fragment>
                )
              }
            </AccordionSet>
          </Col>
        </Row>
      </div>

    );
  }
}
export default FormVendor;
