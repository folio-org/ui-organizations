import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationDetailsInteractor,
} from '../interactors';

describe('Vendor organization details', () => {
  setupApplication();

  const orgDetails = new OrganizationDetailsInteractor();

  beforeEach(function () {
    const vendorOrg = this.server.create('organization', { isVendor: true });

    this.visit(`/organizations/${vendorOrg.id}/view`);
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
});
