import React from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';

import OrganizationAccounts from './OrganizationAccounts';

jest.mock('@folio/stripes-components/lib/NoValue', () => {
  return () => <span>NoValue</span>;
});

const accounts = [{
  name: 'Amazon V',
  accountNo: 'A34sA',
  description: 'Use to buy',
  appSystemNo: '12567',
  paymentMethod: 'Cash',
  contactInfo: 'Max M',
  libraryCode: 'CDA',
  libraryEdiCode: 'ECDA',
  notes: 'Default account',
}];
const renderOrganizationAccounts = () => render(
  <OrganizationAccounts
    accounts={accounts}
  />,
);

describe('OrganizationAccounts', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', () => {
    const { asFragment } = renderOrganizationAccounts();

    expect(asFragment()).toMatchSnapshot();
  });
});
