import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import OrganizationVendorInfo from './OrganizationVendorInfo';

const vendorInfo = {
  paymentMethod: 'Cash',
  claimingInterval: 10,
  vendorCurrencies: ['USD'],
  discountPercent: 11,
  expectedActivationInterval: 12,
  expectedInvoiceInterval: 13,
  expectedReceiptInterval: 14,
  renewalActivationInterval: 15,
  subscriptionInterval: 16,
  taxId: 'taxId',
  taxPercentage: 18,
};
const renderOrganizationVendorInfo = () => render(
  <OrganizationVendorInfo {...vendorInfo} />,
);

describe('OrganizationVendorInfo', () => {
  it('should display payment method', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.accounts.paymentMethod')).toBeDefined();
    expect(screen.getByText('stripes-acq-components.paymentMethod.cash')).toBeDefined();
  });

  it('should display vendor currencies', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.vendorCurrencies')).toBeDefined();
    expect(screen.getByText('US Dollar (USD)')).toBeDefined();
  });

  it('should display claiming interval', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.claimingInterval')).toBeDefined();
    expect(screen.getByText(vendorInfo.claimingInterval)).toBeDefined();
  });

  it('should display discount', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.discountPercent')).toBeDefined();
    expect(screen.getByText(vendorInfo.discountPercent)).toBeDefined();
  });

  it('should display expected activation interval', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.expectedActivationInterval')).toBeDefined();
    expect(screen.getByText(vendorInfo.expectedActivationInterval)).toBeDefined();
  });

  it('should display expected invoice interval', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.expectedInvoiceInterval')).toBeDefined();
    expect(screen.getByText(vendorInfo.expectedInvoiceInterval)).toBeDefined();
  });

  it('should display expected receipt interval', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.expectedReceiptInterval')).toBeDefined();
    expect(screen.getByText(vendorInfo.expectedReceiptInterval)).toBeDefined();
  });

  it('should display renewal activation interval', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.renewalActivationInterval')).toBeDefined();
    expect(screen.getByText(vendorInfo.renewalActivationInterval)).toBeDefined();
  });

  it('should display subscription interval', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.subscriptionInterval')).toBeDefined();
    expect(screen.getByText(vendorInfo.subscriptionInterval)).toBeDefined();
  });

  it('should display export to accounting', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.exportToAccounting')).toBeDefined();
  });

  it('should display tax', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.taxID')).toBeDefined();
    expect(screen.getByText(vendorInfo.taxId)).toBeDefined();
  });

  it('should display tax percentage', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.taxPercentage')).toBeDefined();
    expect(screen.getByText(vendorInfo.taxPercentage)).toBeDefined();
  });

  it('should display VAT', () => {
    renderOrganizationVendorInfo();

    expect(screen.getByText('ui-organizations.vendorInfo.liableForVAT')).toBeDefined();
  });
});
