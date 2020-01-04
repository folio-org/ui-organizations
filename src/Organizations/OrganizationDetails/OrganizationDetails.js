import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  Row,
  Col,
  ExpandAllButton,
  AccordionSet,
  Accordion,
} from '@folio/stripes/components';
import {
  useAccordionToggle,
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
  organization,
  organizationCategories,
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

  return (
    <Pane
      id="pane-organization-details"
      defaultWidth="fill"
      dismissible
      paneTitle={organization.name}
      onClose={onClose}
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
          label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.contactInformationSection]}
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
            <Fragment>
              <Accordion
                id={ORGANIZATION_SECTIONS.vendorInformationSection}
                label={ORGANIZATION_SECTION_LABELS[ORGANIZATION_SECTIONS.vendorInformationSection]}
              >
                <OrganizationVendorInfo
                  organization={organization}
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
                  organization={organization}
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
            </Fragment>
          )
        }
      </AccordionSet>

    </Pane>
  );
};

OrganizationDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
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
