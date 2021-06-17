import React from 'react';
import { render } from '@testing-library/react';

import OrganizationAgreements from './OrganizationAgreements';

const agreements = [{
  name: 'Amazon V',
  discount: 10,
  referenceUrl: 'test.com',
  notes: 'Default',
}];
const renderOrganizationAccounts = () => render(
  <OrganizationAgreements
    agreements={agreements}
  />,
);

describe('OrganizationAgreements', () => {
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
