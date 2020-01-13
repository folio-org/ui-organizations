import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import {
  AutoSuggestListInteractor,
  OrganizationEditInteractor,
} from '../interactors';
import { ORGANIZATION_STATUS } from '../../../src/common/constants';

const TEST_ADDRESS = 'test address';

describe('Create organization', () => {
  setupApplication();

  const orgEdit = new OrganizationEditInteractor();

  beforeEach(async function () {
    this.visit('/organizations/create');
    await orgEdit.whenLoaded();
  });

  it('should render form, Add Contact button', () => {
    expect(orgEdit.isPresent).to.be.true;
    expect(orgEdit.contactPeopleSection.isPresent).to.be.true;
    expect(orgEdit.contactPeopleSection.addContactButton.isPresent).to.be.true;
  });

  describe('submit button', () => {
    it('should be present and disabled', () => {
      expect(orgEdit.createOrgButton.isPresent).to.be.true;
      expect(orgEdit.createOrgButton.isDisabled).to.be.true;
    });
  });

  describe('non-vendor case', () => {
    it('should display appropriate sections', () => {
      expect(orgEdit.summarySectionForm.isPresent).to.be.true;
      expect(orgEdit.contactInformationSection.isPresent).to.be.true;
      expect(orgEdit.interfacesSection.isPresent).to.be.true;
      expect(orgEdit.vendorInformationSection.isPresent).not.to.be.true;
      expect(orgEdit.vendorTermsSection.isPresent).not.to.be.true;
      expect(orgEdit.ediInformationSection.isPresent).not.to.be.true;
      expect(orgEdit.accountsSection.isPresent).not.to.be.true;
    });

    describe('submit action', () => {
      beforeEach(async () => {
        await orgEdit.summarySectionForm.name.fill('Test organization create');
        await orgEdit.summarySectionForm.status.select(ORGANIZATION_STATUS.active);
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

    it('should display appropriate sections for isVendor=true', () => {
      expect(orgEdit.summarySectionForm.isPresent).to.be.true;
      expect(orgEdit.contactInformationSection.isPresent).to.be.true;
      expect(orgEdit.interfacesSection.isPresent).to.be.true;
      expect(orgEdit.vendorInformationSection.isPresent).to.be.true;
      expect(orgEdit.vendorTermsSection.isPresent).to.be.true;
      expect(orgEdit.ediInformationSection.isPresent).to.be.true;
      expect(orgEdit.accountsSection.isPresent).to.be.true;
    });

    describe('add account', () => {
      beforeEach(async () => {
        await orgEdit.accountsSection.click();
        await orgEdit.addAccountButton.click();
      });

      it('should add fiedls for new account', () => {
        expect(orgEdit.removeAccountButton.isPresent).to.be.true;
        expect(orgEdit.accounts().length).to.be.equal(1);
      });

      describe('remove account', () => {
        beforeEach(async () => {
          await orgEdit.removeAccountButton.click();
        });

        it('should remove fiedls for account', () => {
          expect(orgEdit.removeNameButton.isPresent).to.be.false;
          expect(orgEdit.accounts().length).to.be.equal(0);
        });
      });
    });
  });

  describe('add alternative name', () => {
    beforeEach(async () => {
      await orgEdit.addNameButton.click();
    });

    it('should add fiedls for alternative name', () => {
      expect(orgEdit.removeNameButton.isPresent).to.be.true;
      expect(orgEdit.aliases().length).to.be.equal(1);
    });

    describe('remove alternative name', () => {
      beforeEach(async () => {
        await orgEdit.removeNameButton.click();
      });

      it('should remove fiedls for alternative name', () => {
        expect(orgEdit.removeNameButton.isPresent).to.be.false;
        expect(orgEdit.aliases().length).to.be.equal(0);
      });
    });
  });

  describe('add vendor term', () => {
    beforeEach(async () => {
      await orgEdit.summarySectionForm.isVendor.click();
      await orgEdit.vendorTermsSection.addButton.click();
    });

    it('should add field with remove button', () => {
      expect(orgEdit.vendorTermsSection.removeButton.isPresent).to.be.true;
    });

    describe('click remove vendor term', () => {
      beforeEach(async () => {
        await orgEdit.vendorTermsSection.removeButton.click();
      });

      it('disappears item and remove button', () => {
        expect(orgEdit.vendorTermsSection.removeButton.isPresent).to.be.false;
      });
    });
  });

  describe('add several addresses', () => {
    beforeEach(async () => {
      await orgEdit.contactInformationSection.toggle();
      await orgEdit.contactInformationSection.addresses.addressAddButton.click();
    });

    it('displays one address with disabled and checked isPrimary checkbox', () => {
      expect(orgEdit.contactInformationSection.addresses.primaryCheckboxes(0).isChecked).to.be.true;
      expect(orgEdit.contactInformationSection.addresses.primaryCheckboxes(0).isDisabled).to.be.true;
    });

    describe('add another address', () => {
      beforeEach(async () => {
        await orgEdit.contactInformationSection.addresses.addressAddButton.click();
      });

      it('displays second address with enabled and unchecked isPrimary checkbox', () => {
        expect(orgEdit.contactInformationSection.addresses.primaryCheckboxes(1).isChecked).to.be.false;
        expect(orgEdit.contactInformationSection.addresses.primaryCheckboxes(1).isDisabled).to.be.false;
      });

      describe('make second address primary', () => {
        beforeEach(async () => {
          await orgEdit.contactInformationSection.addresses.primaryCheckboxes(1).clickAndBlur();
        });

        it('displays first address with enabled and unchecked isPrimary checkbox', () => {
          expect(orgEdit.contactInformationSection.addresses.primaryCheckboxes(0).isChecked).to.be.false;
          expect(orgEdit.contactInformationSection.addresses.primaryCheckboxes(0).isDisabled).to.be.false;
        });
      });
    });
  });

  describe('add and fill first address', () => {
    beforeEach(async () => {
      await orgEdit.contactInformationSection.toggle();
      await orgEdit.contactInformationSection.addresses.addressAddButton.click();
      await orgEdit.contactInformationSection.addresses.addressLineInputs(0).fill(TEST_ADDRESS);
      await orgEdit.contactInformationSection.addresses.addressAddButton.click();
    });

    it('displays second address with empty address line', () => {
      expect(orgEdit.contactInformationSection.addresses.addressLineInputs(1).value).to.be.empty;
    });

    describe('try autoselect the second address line', () => {
      beforeEach(async () => {
        await orgEdit.contactInformationSection.addresses.addressLineInputs(1).fill('te');
        await new AutoSuggestListInteractor('[id="list-dropdown-addresses[1].addressLine1"]').items(0).click();
      });

      it('displays second address with selected value', () => {
        expect(orgEdit.contactInformationSection.addresses.addressLineInputs(1).value).to.be.equal(TEST_ADDRESS);
      });
    });
  });

  describe('add address, email, url and phone', () => {
    beforeEach(async () => {
      await orgEdit.contactInformationSection.addresses.addressAddButton.click();
      await orgEdit.contactInformationSection.urlAddButton.click();
      await orgEdit.contactInformationSection.emailAddButton.click();
      await orgEdit.contactInformationSection.phoneAddButton.click();
    });

    it('should add field with remove button', () => {
      expect(orgEdit.contactInformationSection.addresses.removeButtons(0).isPresent).to.be.true;
      expect(orgEdit.contactInformationSection.urlRemoveButton.isPresent).to.be.true;
      expect(orgEdit.contactInformationSection.emailRemoveButton.isPresent).to.be.true;
      expect(orgEdit.contactInformationSection.phoneRemoveButton.isPresent).to.be.true;
    });

    describe('click remove', () => {
      beforeEach(async () => {
        await orgEdit.contactInformationSection.addresses.removeButtons(0).click();
        await orgEdit.contactInformationSection.urlRemoveButton.click();
        await orgEdit.contactInformationSection.emailRemoveButton.click();
        await orgEdit.contactInformationSection.phoneRemoveButton.click();
      });

      it('disappears item and remove button', () => {
        expect(orgEdit.contactInformationSection.addresses.removeButtons(0).isPresent).to.be.false;
        expect(orgEdit.contactInformationSection.urlRemoveButton.isPresent).to.be.false;
        expect(orgEdit.contactInformationSection.emailRemoveButton.isPresent).to.be.false;
        expect(orgEdit.contactInformationSection.phoneRemoveButton.isPresent).to.be.false;
      });
    });
  });
});
