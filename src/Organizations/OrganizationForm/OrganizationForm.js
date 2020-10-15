import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import stripesForm from '@folio/stripes/final-form';
import {
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  useAccordionToggle,
} from '@folio/stripes-acq-components';

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
import OrganizationFormFooter from './OrganizationFormFooter';

const OrganizationForm = ({
  pristine,
  submitting,
  handleSubmit,
  initialValues,
  paneTitle,
  cancelForm,
  values: formValues,
  form,
  fetchOrgByCode,
}) => {
  const [expandAll, sections, toggleSection] = useAccordionToggle({
    [ORGANIZATION_SECTIONS.summarySection]: true,
    [ORGANIZATION_SECTIONS.contactInformationSection]: false,
    [ORGANIZATION_SECTIONS.contactPeopleSection]: false,
    [ORGANIZATION_SECTIONS.interfacesSection]: false,
    [ORGANIZATION_SECTIONS.vendorInformationSection]: false,
    [ORGANIZATION_SECTIONS.vendorTermsSection]: false,
    [ORGANIZATION_SECTIONS.ediInformationSection]: false,
    [ORGANIZATION_SECTIONS.accountsSection]: false,
  });

  const { id, interfaces, contacts, metadata } = initialValues;

  const paneFooter = (
    <OrganizationFormFooter
      isSaveDisabled={pristine || submitting}
      saveOrganization={handleSubmit}
      cancelForm={cancelForm}
    />
  );

  return (
    <form id="form-organization">
      <Paneset>
        <Pane
          data-test-form-vendor-pane
          defaultWidth="100%"
          dismissible
          footer={paneFooter}
          paneTitle={paneTitle}
          onClose={cancelForm}
        >
          <Row>
            <Col
              xs={12}
              md={8}
              mdOffset={2}
            >
              <Row end="xs">
                <Col xs={12}>
                  <ExpandAllButton
                    accordionStatus={sections}
                    onToggle={expandAll}
                  />
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
              <AccordionSet
                accordionStatus={sections}
                onToggle={toggleSection}
              >
                <Accordion
                  id={ORGANIZATION_SECTIONS.summarySection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.summarySection]}
                >
                  {metadata && <ViewMetaData metadata={metadata} />}

                  <OrganizationSummaryForm
                    change={form.change}
                    initialValues={initialValues}
                    fetchOrgByCode={fetchOrgByCode}
                    formValues={formValues}
                  />
                </Accordion>
                <Accordion
                  id={ORGANIZATION_SECTIONS.contactInformationSection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactInformationSection]}
                >
                  <OrganizationContactInfoFormContainer
                    defaultLanguage={formValues.language}
                    change={form.change}
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
                        <OrganizationVendorInfoForm change={form.change} />
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
        </Pane>
      </Paneset>
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
  fetchOrgByCode: PropTypes.object.isRequired,
  values: PropTypes.object,
  form: PropTypes.object.isRequired,
};

OrganizationForm.defaultProps = {
  paneTitle: <FormattedMessage id="ui-organizations.createOrg.title" />,
};

export default stripesForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
  validateOnBlur: true,
})(OrganizationForm);
