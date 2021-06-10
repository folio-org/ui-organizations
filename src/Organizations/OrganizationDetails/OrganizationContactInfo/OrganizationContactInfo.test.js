import React from 'react';
import { render, screen } from '@testing-library/react';

import OrganizationContactInfo from './OrganizationContactInfo';

const vendorCategories = [{ id: 'cetegoryId', value: 'Book' }];
const organization = {
  addresses: [{ categories: [vendorCategories[0].id], addressLine1: 'USA, Atlanta' }],
  phoneNumbers: [{ categories: [vendorCategories[0].id], phoneNumber: '595943543' }],
  emails: [{ categories: [vendorCategories[0].id], value: 'test@gmail.com' }],
  urls: [{ categories: [vendorCategories[0].id], value: 'test.com' }],
};
const renderOrganizationContactInfo = () => render(
  <OrganizationContactInfo
    vendorCategories={vendorCategories}
    organization={organization}
  />,
);

describe('OrganizationContactInfo', () => {
  it('should display addresses per category', () => {
    renderOrganizationContactInfo();

    expect(screen.getByText(organization.addresses[0].addressLine1)).toBeDefined();
  });

  it('should display phones per category', () => {
    renderOrganizationContactInfo();

    expect(screen.getByText(organization.phoneNumbers[0].phoneNumber)).toBeDefined();
  });

  it('should display emails per category', () => {
    renderOrganizationContactInfo();

    expect(screen.getByText(organization.emails[0].value)).toBeDefined();
  });

  it('should display urls per category', () => {
    renderOrganizationContactInfo();

    expect(screen.getByText(organization.urls[0].value)).toBeDefined();
  });
});
