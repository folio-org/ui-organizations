import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { mapValues } from 'lodash';

import { IfPermission } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/final-form';
import {
  Accordion,
  AccordionSet,
  Col,
  checkScope,
  ExpandAllButton,
  HasCommand,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  FormFooter,
  PrivilegedDonorContacts,
  handleKeyCommand,
  useAccordionToggle,
} from '@folio/stripes-acq-components';

import { ORGANIZATIONS_ROUTE } from '../../common/constants';
import { useBankingInformationSettings } from '../../common/hooks';
import { OrganizationBankingInfoForm } from './OrganizationBankingInfoForm';
import { OrganizationSummaryForm } from './OrganizationSummaryForm';
import { OrganizationContactInfoFormContainer } from './OrganizationContactInfoForm';
import { OrganizationContactPeopleForm } from './OrganizationContactPeopleForm';
import { OrganizationInterfacesForm } from './OrganizationInterfacesForm';
import { OrganizationVendorInfoForm } from './OrganizationVendorInfoForm';
import { OrganizationAgreementsForm } from './OrganizationAgreementsForm';
import { OrganizationAccountsForm } from './OrganizationAccountsForm';

import {
  ORGANIZATION_SECTIONS,
  ORGANIZATION_SECTION_LABELS,
  MAP_FIELD_ACCORDION,
} from '../constants';

const OrganizationForm = ({
  pristine,
  submitting,
  handleSubmit,
  initialValues,
  paneTitle,
  cancelForm,
  values: formValues,
  form,
}) => {
  const initialAccordionStatus = {
    [ORGANIZATION_SECTIONS.summarySection]: true,
    [ORGANIZATION_SECTIONS.contactInformationSection]: false,
    [ORGANIZATION_SECTIONS.contactPeopleSection]: false,
    [ORGANIZATION_SECTIONS.interfacesSection]: false,
    [ORGANIZATION_SECTIONS.privilegedDonorInformation]: false,
    [ORGANIZATION_SECTIONS.vendorInformationSection]: false,
    [ORGANIZATION_SECTIONS.bankingInformationSection]: false,
    [ORGANIZATION_SECTIONS.vendorTermsSection]: false,
    [ORGANIZATION_SECTIONS.accountsSection]: false,
  };
  const [expandAll, stateSections, toggleSection] = useAccordionToggle(initialAccordionStatus);
  const errorAccordions = Object.keys(form.getState().errors).map(
    (fieldName) => ({ [MAP_FIELD_ACCORDION[fieldName]]: true }),
  );
  const sections = errorAccordions.length
    ? {
      ...stateSections,
      ...(errorAccordions.reduce((acc, section) => ({ ...acc, ...section }), {})),
    }
    : stateSections;
  const history = useHistory();
  const { id, interfaces, contacts, metadata } = initialValues;

  const { enabled: isBankingInformationEnabled } = useBankingInformationSettings();

  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(cancelForm),
    },
    {
      name: 'save',
      handler: handleKeyCommand(handleSubmit, { disabled: pristine || submitting }),
    },
    {
      name: 'expandAllSections',
      handler: () => expandAll(mapValues(stateSections, () => true)),
    },
    {
      name: 'collapseAllSections',
      handler: () => expandAll(mapValues(stateSections, () => false)),
    },
    {
      name: 'search',
      handler: handleKeyCommand(() => history.push(ORGANIZATIONS_ROUTE)),
    },
  ];

  const paneFooter = (
    <FormFooter
      id="organization-form-save"
      label={<FormattedMessage id="stripes-components.saveAndClose" />}
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
                  id="org-form-accordion-set"
                  accordionStatus={sections}
                  onToggle={toggleSection}
                >
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
                    formValues.isDonor && (
                      <IfPermission perm="ui-organizations.privileged-contacts.view">
                        <Accordion
                          id={ORGANIZATION_SECTIONS.privilegedDonorInformation}
                          label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.privilegedDonorInformation]}
                        >
                          <PrivilegedDonorContacts
                            orgId={id}
                            privilegedContactIds={formValues.privilegedContacts}
                            isPrivilegedContactEnabled
                          />
                        </Accordion>
                      </IfPermission>
                    )
                  }
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
                          id={ORGANIZATION_SECTIONS.accountsSection}
                          label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.accountsSection]}
                        >
                          <OrganizationAccountsForm
                            initialAccounts={initialValues.accounts}
                            accountFormValues={formValues.accounts}
                          />
                        </Accordion>

                        {isBankingInformationEnabled && (
                          <IfPermission perm="ui-organizations.banking-information.edit">
                            <Accordion
                              id={ORGANIZATION_SECTIONS.bankingInformationSection}
                              label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.bankingInformationSection]}
                            >
                              <OrganizationBankingInfoForm />
                            </Accordion>
                          </IfPermission>
                        )}
                      </>
                    )
                  }
                </AccordionSet>
              </Col>
            </Row>
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
  form: PropTypes.object,
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
