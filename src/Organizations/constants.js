import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ORGANIZATION_SECTIONS = {
  summarySection: 'summarySection',
  contactInformationSection: 'contactInformationSection',
  contactPeopleSection: 'contactPeopleSection',
  interfacesSection: 'interfacesSection',
  vendorInformationSection: 'vendorInformationSection',
  vendorTermsSection: 'agreementsSection',
  accountsSection: 'accountsSection',
  notesSection: 'notesSection',
  integrationDetailsSection: 'integrationDetailsSection',
  agreements: 'linkedAgreements',
};

export const ORGANIZATION_SECTION_LABELS = {
  [ORGANIZATION_SECTIONS.summarySection]: <FormattedMessage id="ui-organizations.summary" />,
  [ORGANIZATION_SECTIONS.contactInformationSection]: <FormattedMessage id="ui-organizations.contactInformation" />,
  [ORGANIZATION_SECTIONS.contactPeopleSection]: <FormattedMessage id="ui-organizations.contactPeople" />,
  [ORGANIZATION_SECTIONS.interfacesSection]: <FormattedMessage id="ui-organizations.interface" />,
  [ORGANIZATION_SECTIONS.vendorInformationSection]: <FormattedMessage id="ui-organizations.vendorInformation" />,
  [ORGANIZATION_SECTIONS.vendorTermsSection]: <FormattedMessage id="ui-organizations.vendorTerms" />,
  [ORGANIZATION_SECTIONS.accountsSection]: <FormattedMessage id="ui-organizations.accounts" />,
  [ORGANIZATION_SECTIONS.integrationDetailsSection]: <FormattedMessage id="ui-organizations.integrationDetails" />,
  [ORGANIZATION_SECTIONS.agreements]: <FormattedMessage id="ui-organizations.linkedAgreements.section" />,
};

export const CREATE_UNITS_PERM = 'organizations.acquisitions-units-assignments.assign';
export const MANAGE_UNITS_PERM = 'organizations.acquisitions-units-assignments.manage';

// Mapping between attribute (field) in form and id of accordion
export const MAP_FIELD_ACCORDION = {
  name: ORGANIZATION_SECTIONS.summarySection,
  code: ORGANIZATION_SECTIONS.summarySection,
  status: ORGANIZATION_SECTIONS.summarySection,
  aliases: ORGANIZATION_SECTIONS.summarySection,
  addresses: ORGANIZATION_SECTIONS.contactInformationSection,
  phoneNumbers: ORGANIZATION_SECTIONS.contactInformationSection,
  urls: ORGANIZATION_SECTIONS.contactInformationSection,
  agreements: ORGANIZATION_SECTIONS.vendorTermsSection,
  accounts: ORGANIZATION_SECTIONS.accountsSection,
};
