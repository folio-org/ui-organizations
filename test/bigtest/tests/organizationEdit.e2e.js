import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { map } from 'lodash';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationEditInteractor,
} from '../interactors';

const TEST_CODE = 'test_code';

describe('Organization edit', () => {
  setupApplication();

  const orgEdit = new OrganizationEditInteractor();
  let contacts = null;
  let interfaces = null;

  beforeEach(async function () {
    contacts = this.server.createList('contact', 2);
    interfaces = this.server.createList('interface', 2);
    const org = this.server.create('organization', { contacts: map(contacts, 'id'), interfaces: map(interfaces, 'id') });

    this.server.create('organization', { code: TEST_CODE });

    this.visit(`/organizations/${org.id}/edit`);
    await orgEdit.whenLoaded();
  });

  it('shows the close edit pane button', function () {
    expect(orgEdit.closePaneButton.isPresent).to.be.true;
  });

  describe('metadata', function () {
    beforeEach(async function () {
      await orgEdit.summarySectionForm.headerButton.click();
    });

    it('summary section is opened', function () {
      expect(orgEdit.summarySectionForm.isExpanded).to.be.true;
    });

    it('metadata is displayed', function () {
      expect(orgEdit.summarySectionForm.metadata.isPresent).to.be.true;
    });
  });

  describe('vendor checkbox', function () {
    beforeEach(async function () {
      await orgEdit.summarySectionForm.headerButton.click();
    });

    it('vendor checkbox should be display', function () {
      expect(orgEdit.summarySectionForm.isVendor.isPresent).to.be.true;
    });

    describe('confirmation modal', function () {
      beforeEach(async function () {
        await orgEdit.summarySectionForm.isVendor.clickAndBlur();
        await orgEdit.summarySectionForm.isVendor.clickAndBlur();
      });

      it('should be display', function () {
        expect(orgEdit.vendorConfirmationModal.isPresent).to.be.true;
      });
    });

    describe('uncheck and click cancel', function () {
      beforeEach(async function () {
        await orgEdit.summarySectionForm.isVendor.clickAndBlur();
        await orgEdit.summarySectionForm.isVendor.clickAndBlur();
        await orgEdit.vendorConfirmationModal.cancelButton.click();
      });

      it('closes confirmation modal', () => {
        expect(orgEdit.vendorConfirmationModal.isPresent).to.be.false;
      });
    });

    describe('uncheck and click confirm', function () {
      beforeEach(async function () {
        await orgEdit.summarySectionForm.isVendor.clickAndBlur();
        await orgEdit.summarySectionForm.isVendor.clickAndBlur();
        await orgEdit.vendorConfirmationModal.confirmButton.click();
      });

      it('closes onfirmation modal', () => {
        expect(orgEdit.vendorConfirmationModal.isPresent).to.be.false;
      });

      it('should be unchecked', () => {
        expect(orgEdit.summarySectionForm.isVendor.isChecked).to.be.false;
      });
    });
  });

  describe('clicking on the close pane button', function () {
    beforeEach(async function () {
      await orgEdit.closePaneButton.click();
    });

    it('organization\'s edit pane is closed', function () {
      expect(orgEdit.isPresent).to.be.false;
    });
  });

  it('edit organization layer is open', function () {
    expect(orgEdit.isPresent).to.be.true;
  });

  it('contact people section is not expanded', function () {
    expect(orgEdit.contactPeopleSection.isExpanded).to.be.false;
  });

  it('update Vendor Button is disabled', function () {
    expect(orgEdit.updateVendorButton.isDisabled).to.be.true;
  });

  describe('change title and update vendor', function () {
    beforeEach(async function () {
      const name = orgEdit.summarySectionForm.name;

      await orgEdit.summarySectionForm.click();
      await name.fill(`${name.value} new`);
    });

    it('update Vendor Button is disabled', function () {
      expect(orgEdit.updateVendorButton.isDisabled).to.be.false;
    });
  });

  describe('click save but no submit action since code is already in use', () => {
    beforeEach(async () => {
      await orgEdit.summarySectionForm.code.fillAndBlur(TEST_CODE);
      await orgEdit.createOrgButton.focus();
      await orgEdit.createOrgButton.click();
    });

    it('should stay at form', () => {
      expect(orgEdit.isPresent).to.be.true;
    });
  });

  describe('expand contacts accordion', function () {
    beforeEach(async function () {
      await orgEdit.contactPeopleSection.headerButton.click();
    });

    it('displays Contact List', function () {
      expect(orgEdit.contactList.contacts().length).to.equal(contacts.length);
    });

    describe('click unassign contact button', function () {
      beforeEach(async function () {
        await orgEdit.contactList.contacts(0).unassign.click();
      });

      it('contact is unassigned', function () {
        expect(orgEdit.contactList.contacts().length).to.equal(contacts.length - 1);
      });
    });

    describe('click on contact row', function () {
      beforeEach(async function () {
        await orgEdit.contactList.contacts(0).click();
      });

      it('closes org edit form', function () {
        expect(orgEdit.isPresent).to.be.false;
      });
    });
  });

  describe('interfaces list section', () => {
    beforeEach(async function () {
      await orgEdit.interfacesSection.headerButton.click();
    });

    it('display expected list length', () => {
      expect(orgEdit.interfaceList.interfaces().length).to.equal(interfaces.length);
    });

    describe('click unassign interface button', function () {
      beforeEach(async function () {
        await orgEdit.interfaceList.interfaces(0).unassign.click();
      });

      it('interface is unassigned', function () {
        expect(orgEdit.interfaceList.interfaces().length).to.equal(interfaces.length - 1);
      });
    });
  });
});
