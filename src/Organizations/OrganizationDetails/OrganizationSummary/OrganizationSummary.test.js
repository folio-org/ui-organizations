import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import '@folio/stripes-acq-components/test/jest/__mock__';

import OrganizationSummary from './OrganizationSummary';

const STUB_ORG = {
  id: 'e675b2eb-6847-4b4b-b6b4-879759f6ed61',
  name: 'Test org',
  code: 'test org',
  exportToAccounting: false,
  status: 'Active',
  aliases: [],
  addresses: [],
  phoneNumbers: [],
  emails: [],
  urls: [],
  contacts: [],
  agreements: [],
  vendorCurrencies: [],
  interfaces: [],
  accounts: [],
  isVendor: true,
  changelogs: [],
  acqUnitIds: [],
  organizationTypes: ['type 1', 'type 2'],
  metadata: {
    createdDate: '2020-09-09T09:13:03.147+0000',
    createdByUserId: 'd40ce2c6-e043-51c6-8573-b3d953bf5ea6',
    updatedDate: '2020-09-09T09:13:03.147+0000',
    updatedByUserId: 'd40ce2c6-e043-51c6-8573-b3d953bf5ea6',
  },
};

const messages = {
  'ui-organizations.summary.name': 'ui-organizations.summary.name',
  'ui-organizations.summary.alternativeNames': 'ui-organizations.summary.alternativeNames',
  'ui-organizations.summary.description': 'ui-organizations.summary.description',
  'ui-organizations.summary.isVendor': 'ui-organizations.summary.isVendor',
  'ui-organizations.summary.defaultLanguage': 'ui-organizations.summary.defaultLanguage',
  'ui-organizations.organizationStatus.active': 'ui-organizations.organizationStatus.active',
  'ui-organizations.summary.organizationStatus': 'ui-organizations.summary.organizationStatus',
  'ui-organizations.summary.accountingCode': 'ui-organizations.summary.accountingCode',
  'ui-organizations.summary.code': 'ui-organizations.summary.code',
  'stripes-acq-components.label.acqUnits': 'stripes-acq-components.label.acqUnits',
  'stripes-components.selection.filterOptionsLabel': 'Label',
  'stripes-components.selection.emptyList': 'The list is empty',
  'stripes-components.selection.noMatches': 'No any matches',
  'stripes-components.tableEmpty': 'stripes-components.tableEmpty',
  'stripes-components.noValue.noValueSet': 'noValueSet',
};

const renderOrganizationSummary = (organization = STUB_ORG) => (render(
  <IntlProvider locale="en" messages={messages}>
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
      initialOrganizationTypes={organization.organizationTypes}
    />
  </IntlProvider>,
));

describe('OrganizationSummary component', () => {
  it('should display NoValue', () => {
    renderOrganizationSummary();
    const defaultLanguageValue = screen.getByTestId('defaultLanguage').querySelector('[data-test-kv-value]');
    const accountingCodeValue = screen.getByTestId('accountingCode').querySelector('[data-test-kv-value]');
    const nameValue = screen.getByTestId('name').querySelector('[data-test-kv-value]');
    const description = screen.getByTestId('description').querySelector('[data-test-kv-value]');
    const type = screen.getByTestId('type').querySelector('[data-test-kv-value]');

    expect(nameValue).toHaveTextContent('Test org');
    expect(defaultLanguageValue).toHaveTextContent('-');
    expect(accountingCodeValue).toHaveTextContent('-');
    expect(description).toHaveTextContent('-');
    expect(type).toHaveTextContent('type 1, type 2');
  });
});
