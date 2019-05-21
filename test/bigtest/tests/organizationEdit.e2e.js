import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { map } from 'lodash';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationEditInteractor,
} from '../interactors';

describe('Organization edit', () => {
  setupApplication();

  const orgEdit = new OrganizationEditInteractor();
  let contacts = null;
  let interfaces = null;

  beforeEach(function () {
    contacts = this.server.createList('contact', 2);
    interfaces = this.server.createList('interface', 2);
    const org = this.server.create('organization', { contacts: map(contacts, 'id'), interfaces: map(interfaces, 'id') });

    return this.visit(`/organizations/view/${org.id}?layer=edit`, () => {
      expect(orgEdit.$root).to.exist;
    });
  });

  it('shows the close edit pane button', function () {
    expect(orgEdit.closePaneButton.isPresent).to.be.true;
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

  it('contact people section is expanded', function () {
    expect(orgEdit.contactPeopleSection.isExpanded).to.be.true;
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

    describe('click update vendor button', function () {
      beforeEach(async function () {
        await orgEdit.updateVendorButton.click();
      });

      it('Edit layer is closed', function () {
        expect(orgEdit.isPresent).to.be.false;
      });
    });
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

  describe('interfaces list section', () => {
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
