import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';

import {
  IfPermission,
  TitleManager,
  useStripes,
} from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Button,
  checkScope,
  Col,
  collapseAllSections,
  ConfirmationModal,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Icon,
  MenuSection,
  MessageBanner,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';
import {
  handleKeyCommand,
  PrivilegedDonorsListContainer,
  TagsBadge,
  TagsPane,
  useAcqRestrictions,
  useModalToggle,
} from '@folio/stripes-acq-components';

import {
  NOTES_ROUTE,
  ORGANIZATIONS_ROUTE,
} from '../../common/constants';
import {
  ORGANIZATION_SECTIONS,
  ORGANIZATION_SECTION_LABELS,
} from '../constants';
import {
  ORG_DOMAIN,
  ORG_NOTE_TYPE,
} from '../Notes/const';
import { IntegrationDetails } from './IntegrationDetails';
import { LinkedAgreements } from './LinkedAgreements';
import { OrganizationAccounts } from './OrganizationAccounts';
import { OrganizationAgreements } from './OrganizationAgreements';
import { OrganizationBankingInfo } from './OrganizationBankingInfo';
import { OrganizationContactInfo } from './OrganizationContactInfo';
import { OrganizationContactPeopleContainer } from './OrganizationContactPeople';
import { OrganizationInterfacesContainer } from './OrganizationInterfaces';
import { OrganizationSummary } from './OrganizationSummary';
import { OrganizationVendorInfo } from './OrganizationVendorInfo';

const {
  accountsSection,
  agreements,
  bankingInformationSection,
  contactInformationSection,
  contactPeopleSection,
  privilegedDonorInformation,
  integrationDetailsSection,
  interfacesSection,
  notesSection,
  summarySection,
  vendorInformationSection,
  vendorTermsSection,
} = ORGANIZATION_SECTIONS;

const OrganizationDetails = ({
  onClose,
  onEdit,
  onDelete,
  onViewExportLog,
  onUpdate,
  organization,
  organizationCategories,
  integrationConfigs,
  isBankingInformationEnabled,
  organizationTypes,
}) => {
  const stripes = useStripes();
  const [isRemoveModalOpened, toggleRemoveModal] = useModalToggle();
  const initialAccordionStatus = {
    [summarySection]: true,
    [contactInformationSection]: false,
    [contactPeopleSection]: true,
    [interfacesSection]: false,
    [vendorInformationSection]: false,
    [vendorTermsSection]: false,
    [integrationDetailsSection]: false,
    [accountsSection]: false,
    [bankingInformationSection]: false,
    [notesSection]: false,
    [agreements]: false,
  };
  const [isTagsOpened, toggleTagsPane] = useModalToggle();
  const paneTitleRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const accordionStatusRef = useRef();
  const isDetailsPaneInFocus = location.state?.isDetailsPaneInFocus;
  const isDonorVisible = (
    organization?.isDonor && stripes.hasPerm('ui-organizations.privileged-contacts.view')
  );
  const { restrictions, isLoading: isRestrictionsLoading } = useAcqRestrictions(
    organization.id, organization.acqUnitIds,
  );

  const accountNumbers = (organization.isVendor && organization.accounts?.map(({ accountNo }) => accountNo)) || [];
  const hasDuplicateAccountNumbers = [...new Set(accountNumbers)].length !== accountNumbers.length;

  const getOrganizationTypeElement = ((id) => {
    return (
      organizationTypes.find(e => e.id === id)
    );
  });

  const selectedOrganizationTypes = (organization.organizationTypes?.map((id) => getOrganizationTypeElement(id))) || [];
  const organizationTypesLabels = selectedOrganizationTypes.map((item) => (item.name));

  useEffect(() => {
    if (isDetailsPaneInFocus) paneTitleRef.current.focus();
  }, [isDetailsPaneInFocus]);

  const getActionMenu = useCallback(
    ({ onToggle }) => {
      return (
        <MenuSection id="data-test-organizations-details-actions">
          <IfPermission perm="ui-organizations.edit">
            <Button
              buttonStyle="dropdownItem"
              data-testid="edit-organization"
              data-test-button-edit-organization
              onClick={() => {
                onToggle();
                onEdit();
              }}
              disabled={isRestrictionsLoading || restrictions.protectUpdate}
            >
              <Icon size="small" icon="edit">
                <FormattedMessage id="ui-organizations.view.edit" />
              </Icon>
            </Button>
          </IfPermission>
          <IfPermission perm="ui-organizations.delete">
            <Button
              buttonStyle="dropdownItem"
              data-testid="delete-organization"
              data-test-button-delete-organization
              onClick={() => {
                onToggle();
                toggleRemoveModal();
              }}
              disabled={isRestrictionsLoading || restrictions.protectDelete}
            >
              <Icon size="small" icon="trash">
                <FormattedMessage id="ui-organizations.view.delete" />
              </Icon>
            </Button>
          </IfPermission>
          {integrationConfigs.length > 0 && (
            <Button
              buttonStyle="dropdownItem"
              data-testid="view-organization-export-log"
              onClick={() => {
                onToggle();
                onViewExportLog();
              }}
            >
              <Icon size="small" icon="eye-open">
                <FormattedMessage id="ui-organizations.view.exportLog" />
              </Icon>
            </Button>
          )}
        </MenuSection>
      );
    },
    [
      integrationConfigs, onEdit, onViewExportLog, toggleRemoveModal,
      isRestrictionsLoading, restrictions.protectDelete, restrictions.protectUpdate,
    ],
  );

  const detailsLastMenu = (
    <PaneMenu>
      <TagsBadge
        tagsQuantity={get(organization, 'tags.tagList', []).length}
        tagsToggle={toggleTagsPane}
      />
    </PaneMenu>
  );

  const addIntegrationButton = (
    <IfPermission perm="ui-organizations.edit">
      <FormattedMessage id="ui-organizations.integration.create">
        {ariaLabel => (
          <Button
            id="clickable-neworganization-integration"
            aria-label={ariaLabel}
            to={{
              pathname: `/organizations/${organization.id}/integration/create`,
              search: location.search,
            }}
            buttonStyle="primary"
            marginBottom0
          >
            <FormattedMessage id="ui-organizations.integration.create" />
          </Button>
        )}
      </FormattedMessage>
    </IfPermission>
  );

  const shortcuts = [
    {
      name: 'new',
      handler: handleKeyCommand(() => {
        if (stripes.hasPerm('ui-organizations.create')) {
          history.push(`${ORGANIZATIONS_ROUTE}/create`);
        }
      }),
    },
    {
      name: 'edit',
      handler: handleKeyCommand(() => {
        if (
          stripes.hasPerm('ui-organizations.edit') &&
          !isRestrictionsLoading &&
          !restrictions.protectUpdate
        ) onEdit();
      }),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
        id="pane-organization-details"
        defaultWidth="fill"
        dismissible
        paneTitle={organization.name}
        paneTitleRef={paneTitleRef}
        onClose={onClose}
        actionMenu={getActionMenu}
        lastMenu={detailsLastMenu}
      >
        <TitleManager record={organization.name} />
        {hasDuplicateAccountNumbers && (
          <MessageBanner type="warning">
            <FormattedMessage id="ui-organizations.view.duplicateAccounts" />
          </MessageBanner>
        )}
        <AccordionStatus ref={accordionStatusRef}>
          <Row end="xs">
            <Col xs={12}>
              <ExpandAllButton />
            </Col>
          </Row>

          <AccordionSet initialStatus={initialAccordionStatus}>
            <Accordion
              id={summarySection}
              label={ORGANIZATION_SECTION_LABELS[summarySection]}
            >
              <OrganizationSummary
                acqUnitIds={organization.acqUnitIds}
                aliases={organization.aliases}
                code={organization.code}
                description={organization.description}
                erpCode={organization.erpCode}
                isVendor={organization.isVendor}
                isDonor={organization.isDonor}
                language={organization.language}
                metadata={organization.metadata}
                name={organization.name}
                status={organization.status}
                organizationTypes={organizationTypesLabels}
              />
            </Accordion>

            <NotesSmartAccordion
              domainName={ORG_DOMAIN}
              entityId={organization.id}
              entityName={organization.name}
              entityType={ORG_NOTE_TYPE}
              hideAssignButton
              id={notesSection}
              pathToNoteCreate={`${NOTES_ROUTE}/new`}
              pathToNoteDetails={NOTES_ROUTE}
            />

            <Accordion
              id={contactInformationSection}
              label={ORGANIZATION_SECTION_LABELS[contactInformationSection]}
            >
              <OrganizationContactInfo
                organization={organization}
                vendorCategories={organizationCategories}
              />
            </Accordion>

            <Accordion
              id={contactPeopleSection}
              label={ORGANIZATION_SECTION_LABELS[contactPeopleSection]}
            >
              <OrganizationContactPeopleContainer
                contactsIds={organization.contacts}
                vendorCategories={organizationCategories}
              />
            </Accordion>

            <Accordion
              id={interfacesSection}
              label={ORGANIZATION_SECTION_LABELS[interfacesSection]}
            >
              <OrganizationInterfacesContainer
                interfaceIds={organization.interfaces}
              />
            </Accordion>

            {
              isDonorVisible && (
              <Accordion
                id={privilegedDonorInformation}
                label={ORGANIZATION_SECTION_LABELS[privilegedDonorInformation]}
              >
                <PrivilegedDonorsListContainer
                  privilegedContactIds={organization.privilegedContacts}
                />
              </Accordion>
              )
            }

            {
              organization.isVendor && (
                <>
                  <Accordion
                    id={vendorInformationSection}
                    label={ORGANIZATION_SECTION_LABELS[vendorInformationSection]}
                  >
                    <OrganizationVendorInfo
                      paymentMethod={organization.paymentMethod}
                      vendorCurrencies={organization.vendorCurrencies}
                      claimingInterval={organization.claimingInterval}
                      discountPercent={organization.discountPercent}
                      expectedActivationInterval={organization.expectedActivationInterval}
                      expectedInvoiceInterval={organization.expectedInvoiceInterval}
                      expectedReceiptInterval={organization.expectedReceiptInterval}
                      renewalActivationInterval={organization.renewalActivationInterval}
                      subscriptionInterval={organization.subscriptionInterval}
                      taxId={organization.taxId}
                      taxPercentage={organization.taxPercentage}
                      isLiableForVat={!!organization.liableForVat}
                      isExportToAccounting={organization.exportToAccounting}
                    />
                  </Accordion>

                  <Accordion
                    id={vendorTermsSection}
                    label={ORGANIZATION_SECTION_LABELS[vendorTermsSection]}
                  >
                    <OrganizationAgreements
                      agreements={organization.agreements}
                    />
                  </Accordion>

                  <Accordion
                    id={integrationDetailsSection}
                    label={ORGANIZATION_SECTION_LABELS[integrationDetailsSection]}
                    displayWhenOpen={addIntegrationButton}
                  >
                    <IntegrationDetails
                      integrationConfigs={integrationConfigs}
                      orgId={organization.id}
                    />
                  </Accordion>

                  <Accordion
                    id={accountsSection}
                    label={ORGANIZATION_SECTION_LABELS[accountsSection]}
                  >
                    <OrganizationAccounts
                      accounts={organization.accounts}
                    />
                  </Accordion>

                  {isBankingInformationEnabled && (
                    <IfPermission perm="ui-organizations.banking-information.view">
                      <Accordion
                        id={ORGANIZATION_SECTIONS.bankingInformationSection}
                        label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.bankingInformationSection]}
                      >
                        <OrganizationBankingInfo organization={organization} />
                      </Accordion>
                    </IfPermission>
                  )}
                </>
              )
            }

            <LinkedAgreements
              id={agreements}
              label={ORGANIZATION_SECTION_LABELS[agreements]}
              organization={organization}
            />
          </AccordionSet>
        </AccordionStatus>

        {isRemoveModalOpened && (
          <ConfirmationModal
            id="delete-organization-confirmation"
            confirmLabel={<FormattedMessage id="ui-organizations.organization.delete.confirmLabel" />}
            heading={<FormattedMessage id="ui-organizations.organization.delete.heading" values={{ organizationName: `${organization.name}` }} />}
            message={<FormattedMessage id="ui-organizations.view.delete.message" />}
            onCancel={toggleRemoveModal}
            onConfirm={onDelete}
            open
          />
        )}
      </Pane>

      {
        isTagsOpened && (
          <TagsPane
            onClose={toggleTagsPane}
            entity={organization}
            updateEntity={onUpdate}
          />
        )
      }
    </HasCommand>
  );
};

OrganizationDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewExportLog: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  organizationCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  })),
  integrationConfigs: PropTypes.arrayOf(PropTypes.object),
  isBankingInformationEnabled: PropTypes.bool,
  organizationTypes: PropTypes.arrayOf(PropTypes.object),
};

OrganizationDetails.defaultProps = {
  organizationCategories: [],
  isBankingInformationEnabled: false,
};

export default OrganizationDetails;
