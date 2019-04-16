import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationEditInteractor,
} from '../interactors';

describe('Create organization', () => {
  setupApplication();

  const orgEdit = new OrganizationEditInteractor();

  beforeEach(function () {
    return this.visit('/organizations/view?layer=create', () => {
      expect(orgEdit.$root).to.exist;
    });
  });

  it('should render form', () => {
    expect(orgEdit.isPresent).to.be.true;
  });

  describe('submit button', () => {
    it('should be present', () => {
      expect(orgEdit.createOrgButton.isPresent).to.be.true;
    });

    it('should be disabled after form initialization', () => {
      expect(orgEdit.createOrgButton.isDisabled).to.be.true;
    });
  });

  describe('non-vendor case', () => {
    it('should display summary section', () => {
      expect(orgEdit.summarySectionForm.isPresent).to.be.true;
    });

    it('should display contact information section', () => {
      expect(orgEdit.contactInformationSection.isPresent).to.be.true;
    });

    it('should display contact people section', () => {
      expect(orgEdit.contactPeopleSection.isPresent).to.be.true;
    });

    it('should display interfaces section', () => {
      expect(orgEdit.interfacesSection.isPresent).to.be.true;
    });

    it('should not display vendor information section', () => {
      expect(orgEdit.vendorInformationSection.isPresent).not.to.be.true;
    });

    it('should not display vendor terms section', () => {
      expect(orgEdit.vendorTermsSection.isPresent).not.to.be.true;
    });

    it('should not display EDI information section', () => {
      expect(orgEdit.ediInformationSection.isPresent).not.to.be.true;
    });

    it('should not display accounts section', () => {
      expect(orgEdit.accountsSection.isPresent).not.to.be.true;
    });

    describe('submit action', () => {
      beforeEach(async () => {
        await orgEdit.summarySectionForm.name.fill('Test organization create');
        await orgEdit.summarySectionForm.status.select('Active');
        await orgEdit.summarySectionForm.code.fill('Test code');
        await orgEdit.createOrgButton.click();
      });

      it('should close form', () => {
        expect(orgEdit.isPresent).to.be.false;
      });
    });
  });

  describe('vendor case', () => {
    beforeEach(async () => {
      await orgEdit.summarySectionForm.isVendor.click();
    });

    it('should display summary section', () => {
      expect(orgEdit.summarySectionForm.isPresent).to.be.true;
    });

    it('should display contact information section', () => {
      expect(orgEdit.contactInformationSection.isPresent).to.be.true;
    });

    it('should display contact people section', () => {
      expect(orgEdit.contactPeopleSection.isPresent).to.be.true;
    });

    it('should display interfaces section', () => {
      expect(orgEdit.interfacesSection.isPresent).to.be.true;
    });

    it('should display vendor information section', () => {
      expect(orgEdit.vendorInformationSection.isPresent).to.be.true;
    });

    it('should display vendor terms section', () => {
      expect(orgEdit.vendorTermsSection.isPresent).to.be.true;
    });

    it('should display EDI information section', () => {
      expect(orgEdit.ediInformationSection.isPresent).to.be.true;
    });

    it('should display accounts section', () => {
      expect(orgEdit.accountsSection.isPresent).to.be.true;
    });
  });
});
