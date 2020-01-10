import React, {
  Fragment,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import stripesForm from '@folio/stripes/form';
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

const ORG_FORM_NAME = 'FormOrganization';

const OrganizationForm = ({
  pristine,
  submitting,
  handleSubmit,
  dispatch,
  change,
  store,
  paneTitle,
  cancelForm,
  initialValues,
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

  const dispatchChange = useCallback(
    (fieldName, value) => {
      dispatch(change(fieldName, value));
    },
    [dispatch, change],
  );

  const { id, interfaces, contacts, metadata } = initialValues;
  const { isVendor, language } = getFormValues(ORG_FORM_NAME)(store.getState()) || {};

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
          <Row
            center="xs"
          >
            <Col
              xs={12}
              md={8}
              mdOffset={2}
            >
              <ExpandAllButton
                accordionStatus={sections}
                onToggle={expandAll}
              />
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
                    dispatchChange={dispatchChange}
                    initialValues={initialValues}
                  />
                </Accordion>
                <Accordion
                  id={ORGANIZATION_SECTIONS.contactInformationSection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactInformationSection]}
                >
                  <OrganizationContactInfoFormContainer
                    defaultLanguage={language}
                    dispatchChange={dispatchChange}
                  />
                </Accordion>
                <Accordion
                  id={ORGANIZATION_SECTIONS.contactPeopleSection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactPeopleSection]}
                >
                  <OrganizationContactPeopleForm
                    orgId={id}
                    storedContactIds={contacts}
                  />
                </Accordion>
                <Accordion
                  id={ORGANIZATION_SECTIONS.interfacesSection}
                  label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.interfacesSection]}
                >
                  <OrganizationInterfacesForm
                    orgId={id}
                    storedInterfaces={interfaces}
                  />
                </Accordion>
                {
                  isVendor && (
                    <Fragment>
                      <Accordion
                        id={ORGANIZATION_SECTIONS.vendorInformationSection}
                        label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorInformationSection]}
                      >
                        <OrganizationVendorInfoForm dispatchChange={dispatchChange} />
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
                        <OrganizationAccountsForm />
                      </Accordion>
                    </Fragment>
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
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cancelForm: PropTypes.object.isRequired,
  paneTitle: PropTypes.node,
};

OrganizationForm.defaultProps = {
  paneTitle: <FormattedMessage id="ui-organizations.createOrg.title" />,
};

export default stripesForm({
  form: ORG_FORM_NAME,
  navigationCheck: true,
  enableReinitialize: true,
})(OrganizationForm);
