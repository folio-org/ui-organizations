import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import stripesForm from '@folio/stripes/final-form';
import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Col,
  checkScope,
  collapseAllSections,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import { FormFooter } from '@folio/stripes-acq-components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import { OrganizationSummaryForm } from './OrganizationSummaryForm';
import { OrganizationContactInfoFormContainer } from './OrganizationContactInfoForm';
import { OrganizationContactPeopleForm } from './OrganizationContactPeopleForm';
import { OrganizationInterfacesForm } from './OrganizationInterfacesForm';
import { OrganizationVendorInfoForm } from './OrganizationVendorInfoForm';
import { OrganizationAgreementsForm } from './OrganizationAgreementsForm';
import { OrganizationEDIInfoForm } from './OrganizationEDIInfoForm';
import { OrganizationAccountsForm } from './OrganizationAccountsForm';

import {
  ORGANIZATION_SECTIONS,
  ORGANIZATION_SECTION_LABELS,
} from '../constants';

const OrganizationForm = ({
  pristine,
  submitting,
  handleSubmit,
  initialValues,
  paneTitle,
  cancelForm,
  values: formValues,
}) => {
  const initialAccordionStatus = {
    [ORGANIZATION_SECTIONS.summarySection]: true,
    [ORGANIZATION_SECTIONS.contactInformationSection]: false,
    [ORGANIZATION_SECTIONS.contactPeopleSection]: false,
    [ORGANIZATION_SECTIONS.interfacesSection]: false,
    [ORGANIZATION_SECTIONS.vendorInformationSection]: false,
    [ORGANIZATION_SECTIONS.vendorTermsSection]: false,
    [ORGANIZATION_SECTIONS.ediInformationSection]: false,
    [ORGANIZATION_SECTIONS.accountsSection]: false,
  };
  const history = useHistory();
  const accordionStatusRef = useRef();
  const { id, interfaces, contacts, metadata } = initialValues;
  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: () => cancelForm(),
    },
    {
      name: 'save',
      handler: handleSubmit,
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
    {
      name: 'search',
      handler: () => history.push(ORGANIZATIONS_ROUTE),
    },
  ];

  const paneFooter = (
    <FormFooter
      id="organization-form-save"
      label={<FormattedMessage id="ui-organizations.button.saveAndClose" />}
      pristine={pristine}
      submitting={submitting}
      handleSubmit={handleSubmit}
      onCancel={cancelForm}
    />
  );

  return (
    <form id="form-organization">
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Paneset>
          <Pane
            data-test-form-vendor-pane
            defaultWidth="100%"
            dismissible
            footer={paneFooter}
            paneTitle={paneTitle}
            onClose={cancelForm}
          >
            <AccordionStatus ref={accordionStatusRef}>
              <Row>
                <Col
                  xs={12}
                  md={8}
                  mdOffset={2}
                >
                  <Row end="xs">
                    <Col xs={12}>
                      <ExpandAllButton />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col
                  xs={12}
                  md={8}
                  mdOffset={2}
                >
                  <AccordionSet initialStatus={initialAccordionStatus}>
                    <Accordion
                      id={ORGANIZATION_SECTIONS.summarySection}
                      label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.summarySection]}
                    >
                      {metadata && <ViewMetaData metadata={metadata} />}

                      <OrganizationSummaryForm
                        initialValues={initialValues}
                      />
                    </Accordion>
                    <Accordion
                      id={ORGANIZATION_SECTIONS.contactInformationSection}
                      label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactInformationSection]}
                    >
                      <OrganizationContactInfoFormContainer
                        defaultLanguage={formValues.language}
                      />
                    </Accordion>
                    <Accordion
                      id={ORGANIZATION_SECTIONS.contactPeopleSection}
                      label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactPeopleSection]}
                    >
                      {open => (
                        <OrganizationContactPeopleForm
                          open={open}
                          orgId={id}
                          storedContactIds={contacts}
                        />
                      )}
                    </Accordion>
                    <Accordion
                      id={ORGANIZATION_SECTIONS.interfacesSection}
                      label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.interfacesSection]}
                    >
                      {open => (
                        <OrganizationInterfacesForm
                          open={open}
                          orgId={id}
                          storedInterfaces={interfaces}
                        />
                      )}
                    </Accordion>
                    {
                      formValues.isVendor && (
                        <>
                          <Accordion
                            id={ORGANIZATION_SECTIONS.vendorInformationSection}
                            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorInformationSection]}
                          >
                            <OrganizationVendorInfoForm />
                          </Accordion>

                          <Accordion
                            id={ORGANIZATION_SECTIONS.vendorTermsSection}
                            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorTermsSection]}
                          >
                            <OrganizationAgreementsForm />
                          </Accordion>

                          <Accordion
                            id={ORGANIZATION_SECTIONS.ediInformationSection}
                            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.ediInformationSection]}
                          >
                            <OrganizationEDIInfoForm />
                          </Accordion>

                          <Accordion
                            id={ORGANIZATION_SECTIONS.accountsSection}
                            label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.accountsSection]}
                          >
                            <OrganizationAccountsForm
                              initialAccounts={initialValues.accounts}
                              accountFormValues={formValues.accounts}
                            />
                          </Accordion>
                        </>
                      )
                    }
                  </AccordionSet>
                </Col>
              </Row>
            </AccordionStatus>
          </Pane>
        </Paneset>
      </HasCommand>
    </form>
  );
};

OrganizationForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
  paneTitle: PropTypes.node,
  values: PropTypes.object,
};

OrganizationForm.defaultProps = {
  paneTitle: <FormattedMessage id="ui-organizations.createOrg.title" />,
};

export default stripesForm({
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
  validateOnBlur: true,
})(OrganizationForm);
