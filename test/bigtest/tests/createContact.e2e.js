import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import { CreateContactInteractor } from '../interactors';

describe('Create contact', () => {
  setupApplication();

  const createContact = new CreateContactInteractor();

  beforeEach(function () {
    const organization = this.server.create('organization');

    return this.visit(`/organizations/${organization.id}/contacts/add-contact`, () => {
      expect(createContact.$root).to.exist;
    });
  });

  describe('Create contact form', () => {
    it('create contact form should be present', () => {
      expect(createContact.saveButton.isPresent).to.be.true;
      expect(createContact.addressForm.addresses().length).to.be.equal(0);
      expect(createContact.phoneForm.phones().length).to.be.equal(0);
      expect(createContact.emailForm.emails().length).to.be.equal(0);
      expect(createContact.urlForm.urls().length).to.be.equal(0);
    });
  });

  describe('Add address', () => {
    beforeEach(async function () {
      await createContact.addressForm.addAddressButton();
    });

    it('create form for adding new address', () => {
      expect(createContact.addressForm.addresses().length).to.be.equal(1);
    });

    describe('Remove address', () => {
      beforeEach(async function () {
        await createContact.addressForm.removeAddressButton();
      });

      it('remove form for adding new address', () => {
        expect(createContact.addressForm.addresses().length).to.be.equal(0);
      });
    });
  });

  describe('Add phone', () => {
    beforeEach(async function () {
      await createContact.phoneForm.addPhoneButton();
    });

    it('create form for adding new phone', () => {
      expect(createContact.phoneForm.phones().length).to.be.equal(1);
    });

    describe('Remove phone', () => {
      beforeEach(async function () {
        await createContact.phoneForm.removePhoneButton();
      });

      it('remove form for adding new phone', () => {
        expect(createContact.phoneForm.phones().length).to.be.equal(0);
      });
    });
  });

  describe('Add email', () => {
    beforeEach(async function () {
      await createContact.emailForm.addEmailButton();
    });

    it('create form for adding new email', () => {
      expect(createContact.emailForm.emails().length).to.be.equal(1);
    });

    describe('Remove email', () => {
      beforeEach(async function () {
        await createContact.emailForm.removeEmailButton();
      });

      it('remove form for adding new email', () => {
        expect(createContact.emailForm.emails().length).to.be.equal(0);
      });
    });
  });

  describe('Add url', () => {
    beforeEach(async function () {
      await createContact.urlForm.addUrlButton();
    });

    it('create form for adding new url', () => {
      expect(createContact.urlForm.urls().length).to.be.equal(1);
    });

    describe('Remove url', () => {
      beforeEach(async function () {
        await createContact.urlForm.removeUrlButton();
      });

      it('remove form for adding new url', () => {
        expect(createContact.urlForm.urls().length).to.be.equal(0);
      });
    });
  });
});
