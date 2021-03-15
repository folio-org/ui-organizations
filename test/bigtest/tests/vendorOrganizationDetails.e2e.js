import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { VIEW_ORG_DETAILS } from '../../../src/common/constants';
import setupApplication from '../helpers/setup-application';
import {
  OrganizationDetailsInteractor,
} from '../interactors';

describe('Vendor organization details', function () {
  setupApplication();
  this.timeout(10000);

  const orgDetails = new OrganizationDetailsInteractor();

  beforeEach(function () {
    const vendorOrg = this.server.create('organization', {
      isVendor: true,
      vendorCurrencies: ['USD'],
      accounts: [{ accountNo: '001' }],
      agreements: [{ name: 'library access' }],
    });

    this.visit(`${VIEW_ORG_DETAILS}${vendorOrg.id}`);
  });

  it('renders Organization details', () => {
    expect(orgDetails.$root).to.exist;
  });

  it('summarySection is displayed', function () {
    expect(orgDetails.summarySection.isPresent).to.be.true;
  });

  it('contactInformationSection is displayed', function () {
    expect(orgDetails.contactInformationSection.isPresent).to.be.true;
  });

  it('contactPeopleSection is displayed', function () {
    expect(orgDetails.contactPeopleSection.isPresent).to.be.true;
  });

  it('interfacesSection is displayed', function () {
    expect(orgDetails.interfacesSection.isPresent).to.be.true;
  });

  it('vendorInformationSection is displayed', function () {
    expect(orgDetails.vendorInformationSection.isPresent).to.be.true;
    expect(orgDetails.vendorCurrencies.value).to.contain('US Dollar (USD)');
  });

  it('vendorTermsSection is displayed', function () {
    expect(orgDetails.vendorTermsSection.isPresent).to.be.true;
  });

  it('ediInformationSection is displayed', function () {
    expect(orgDetails.ediInformationSection.isPresent).to.be.true;
  });

  it('accountsSection is displayed', function () {
    expect(orgDetails.accountsSection.isPresent).to.be.true;
  });

  describe('open accounts sections', function () {
    beforeEach(async function () {
      await orgDetails.accountsSection.headerButton.click();
    });

    it('accounts section is opened and account is presented', function () {
      expect(orgDetails.accountsSection.accounts).to.be.true;
    });
  });

  describe('open vendor terms sections', function () {
    beforeEach(async function () {
      await orgDetails.vendorTermsSection.headerButton.click();
    });

    it('vendor terms section is opened and agreement is presented', function () {
      expect(orgDetails.vendorTermsSection.agreements).to.be.true;
    });
  });
});
