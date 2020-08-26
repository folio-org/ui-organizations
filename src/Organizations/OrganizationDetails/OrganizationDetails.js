import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  Icon,
  MenuSection,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import {
  TagsBadge,
  TagsPane,
  useAccordionToggle,
  useModalToggle,
} from '@folio/stripes-acq-components';

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
  const [isRemoveModalOpened, toggleRemoveModal] = useModalToggle();
  const [expandAll, sections, toggleSection] = useAccordionToggle({
    [ORGANIZATION_SECTIONS.summarySection]: true,
    [ORGANIZATION_SECTIONS.contactInformationSection]: false,
    [ORGANIZATION_SECTIONS.contactPeopleSection]: true,
    [ORGANIZATION_SECTIONS.interfacesSection]: false,
    [ORGANIZATION_SECTIONS.vendorInformationSection]: false,
    [ORGANIZATION_SECTIONS.vendorTermsSection]: false,
    [ORGANIZATION_SECTIONS.ediInformationSection]: false,
    [ORGANIZATION_SECTIONS.accountsSection]: false,
  });
  const [isTagsOpened, toggleTagsPane] = useModalToggle();

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
            >
              <Icon size="small" icon="trash">
                <FormattedMessage id="ui-organizations.view.delete" />
              </Icon>
            </Button>
          </IfPermission>
        </MenuSection>
      );
    },
    [onEdit, toggleRemoveModal],
  );

  const detailsLastMenu = (
    <PaneMenu>
      <TagsBadge
        tagsQuantity={get(organization, 'tags.tagList', []).length}
        tagsToggle={toggleTagsPane}
      />
    </PaneMenu>
  );

  return (
    <>
      <Pane
        id="pane-organization-details"
        defaultWidth="fill"
        dismissible
        paneTitle={organization.name}
        onClose={onClose}
        actionMenu={getActionMenu}
        lastMenu={detailsLastMenu}
      >
        <Row end="xs">
          <Col xs={12}>
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={expandAll}
            />
          </Col>
        </Row>

        <AccordionSet
          accordionStatus={sections}
          onToggle={toggleSection}
        >
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
    </>
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
