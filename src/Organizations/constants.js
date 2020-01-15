import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ORGANIZATION_SECTIONS = {
  summarySection: 'summarySection',
  contactInformationSection: 'contactInformationSection',
  contactPeopleSection: 'contactPeopleSection',
  interfacesSection: 'interfacesSection',
  vendorInformationSection: 'vendorInformationSection',
  vendorTermsSection: 'agreementsSection',
  ediInformationSection: 'EDIInformationSection',
  accountsSection: 'accountsSection',
};

export const ORGANIZATION_SECTION_LABELS = {
  [ORGANIZATION_SECTIONS.summarySection]: <FormattedMessage id="ui-organizations.summary" />,
  [ORGANIZATION_SECTIONS.contactInformationSection]: <FormattedMessage id="ui-organizations.contactInformation" />,
  [ORGANIZATION_SECTIONS.contactPeopleSection]: <FormattedMessage id="ui-organizations.contactPeople" />,
  [ORGANIZATION_SECTIONS.interfacesSection]: <FormattedMessage id="ui-organizations.interface" />,
  [ORGANIZATION_SECTIONS.vendorInformationSection]: <FormattedMessage id="ui-organizations.vendorInformation" />,
  [ORGANIZATION_SECTIONS.vendorTermsSection]: <FormattedMessage id="ui-organizations.vendorTerms" />,
  [ORGANIZATION_SECTIONS.ediInformationSection]: <FormattedMessage id="ui-organizations.ediInformation" />,
  [ORGANIZATION_SECTIONS.accountsSection]: <FormattedMessage id="ui-organizations.accounts" />,
};

export const EDI_CODE_TYPES = [
  { label: '31B (US-SAN)', value: '31B/US-SAN' },
  { label: '014 (EAN)', value: '014/EAN' },
  { label: '091 (Supplier-assigned ID)', value: '091/Vendor-assigned' },
  { label: '092 (Library-assigned ID)', value: '092/Customer-assigned' },
];

export const FTP_TYPES = [
  { label: 'SFTP', value: 'SFTP' },
  { label: 'FTP', value: 'FTP' },
];

export const TRANSMISSION_MODES = [
  { label: 'ASCII', value: 'ASCII' },
  { label: 'Binary', value: 'Binary' },
];

export const CONNECTION_MODES = [
  { label: 'Active', value: 'Active' },
  { label: 'Passive', value: 'Passive' },
];
