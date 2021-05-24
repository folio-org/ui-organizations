import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';

import {
  IfPermission,
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
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';
import {
  handleKeyCommand,
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
  ORG_DOMAIN,
  ORG_NOTE_TYPE,
} from '../Notes/const';
import {
  ORGANIZATION_SECTIONS,
  ORGANIZATION_SECTION_LABELS,
} from '../constants';
import { OrganizationSummary } from './OrganizationSummary';
import { OrganizationContactInfo } from './OrganizationContactInfo';
import { OrganizationContactPeopleContainer } from './OrganizationContactPeople';
import { OrganizationInterfacesContainer } from './OrganizationInterfaces';
import { OrganizationVendorInfo } from './OrganizationVendorInfo';
import { OrganizationAgreements } from './OrganizationAgreements';
import { OrganizationEDIInfo } from './OrganizationEDIInfo';
import { OrganizationAccounts } from './OrganizationAccounts';

const OrganizationDetails = ({
  onClose,
  onEdit,
  onDelete,
  onUpdate,
  organization,
  organizationCategories,
}) => {
  const stripes = useStripes();
  const [isRemoveModalOpened, toggleRemoveModal] = useModalToggle();
  const initialAccordionStatus = {
    [ORGANIZATION_SECTIONS.summarySection]: true,
    [ORGANIZATION_SECTIONS.contactInformationSection]: false,
    [ORGANIZATION_SECTIONS.contactPeopleSection]: true,
    [ORGANIZATION_SECTIONS.interfacesSection]: false,
    [ORGANIZATION_SECTIONS.vendorInformationSection]: false,
    [ORGANIZATION_SECTIONS.vendorTermsSection]: false,
    [ORGANIZATION_SECTIONS.ediInformationSection]: false,
    [ORGANIZATION_SECTIONS.accountsSection]: false,
    [ORGANIZATION_SECTIONS.notesSection]: false,
  };
  const [isTagsOpened, toggleTagsPane] = useModalToggle();
  const paneTitleRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const accordionStatusRef = useRef();
  const isDetailsPaneInFocus = location.state?.isDetailsPaneInFocus;
  const { restrictions, isLoading: isRestrictionsLoading } = useAcqRestrictions(
    organization.id, organization.acqUnitIds,
  );

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
        </MenuSection>
      );
    },
    [onEdit, toggleRemoveModal, isRestrictionsLoading, restrictions.protectDelete, restrictions.protectUpdate],
  );

  const detailsLastMenu = (
    <PaneMenu>
      <TagsBadge
        tagsQuantity={get(organization, 'tags.tagList', []).length}
        tagsToggle={toggleTagsPane}
      />
    </PaneMenu>
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
        <AccordionStatus ref={accordionStatusRef}>
          <Row end="xs">
            <Col xs={12}>
              <ExpandAllButton />
            </Col>
          </Row>

          <AccordionSet initialStatus={initialAccordionStatus}>
            <Accordion
              id={ORGANIZATION_SECTIONS.summarySection}
              label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.summarySection]}
            >
              <OrganizationSummary
                acqUnitIds={organization.acqUnitIds}
                aliases={organization.aliases}
                code={organization.code}
                description={organization.description}
                erpCode={organization.erpCode}
                isVendor={organization.isVendor}
                language={organization.language}
                metadata={organization.metadata}
                name={organization.name}
                status={organization.status}
              />
            </Accordion>

            <NotesSmartAccordion
              domainName={ORG_DOMAIN}
              entityId={organization.id}
              entityName={organization.name}
              entityType={ORG_NOTE_TYPE}
              hideAssignButton
              id={ORGANIZATION_SECTIONS.notesSection}
              pathToNoteCreate={`${NOTES_ROUTE}/new`}
              pathToNoteDetails={NOTES_ROUTE}
            />

            <Accordion
              id={ORGANIZATION_SECTIONS.contactInformationSection}
              label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactInformationSection]}
            >
              <OrganizationContactInfo
                organization={organization}
                vendorCategories={organizationCategories}
              />
            </Accordion>

            <Accordion
              id={ORGANIZATION_SECTIONS.contactPeopleSection}
              label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactPeopleSection]}
            >
              <OrganizationContactPeopleContainer
                contactsIds={organization.contacts}
                vendorCategories={organizationCategories}
              />
            </Accordion>

            <Accordion
              id={ORGANIZATION_SECTIONS.interfacesSection}
              label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.interfacesSection]}
            >
              <OrganizationInterfacesContainer
                interfaceIds={organization.interfaces}
              />
            </Accordion>

            {
              organization.isVendor && (
                <>
                  <Accordion
                    id={ORGANIZATION_SECTIONS.vendorInformationSection}
                    label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorInformationSection]}
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
                    id={ORGANIZATION_SECTIONS.vendorTermsSection}
                    label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorTermsSection]}
                  >
                    <OrganizationAgreements
                      agreements={organization.agreements}
                    />
                  </Accordion>

                  <Accordion
                    id={ORGANIZATION_SECTIONS.ediInformationSection}
                    label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.ediInformationSection]}
                  >
                    <OrganizationEDIInfo
                      edi={organization.edi}
                    />
                  </Accordion>

                  <Accordion
                    id={ORGANIZATION_SECTIONS.accountsSection}
                    label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.accountsSection]}
                  >
                    <OrganizationAccounts
                      accounts={organization.accounts}
                    />
                  </Accordion>
                </>
              )
            }
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
  onUpdate: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  organizationCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  })),
};

OrganizationDetails.defaultProps = {
  organizationCategories: [],
};

export default OrganizationDetails;
