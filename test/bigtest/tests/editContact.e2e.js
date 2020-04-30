import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import {
  CreateContactInteractor,
  ViewContactInteractor,
} from '../interactors';

const TEST_NOTE = 'Test note';

describe('Edit contact', () => {
  setupApplication();

  const editContact = new CreateContactInteractor();
  const viewContact = new ViewContactInteractor();

  beforeEach(async function () {
    const contact = this.server.create('contact', { notes: TEST_NOTE });
    const organization = this.server.create('organization', {
      contacts: [contact.id],
    });

    this.visit(`/organizations/${organization.id}/contacts/${contact.id}/edit`);
    await editContact.whenLoaded();
  });

  describe('Edit contact form', () => {
    it('edit contact form should be present', () => {
      expect(editContact.saveButton.isPresent).to.be.true;
      expect(editContact.saveButton.isDisabled).to.be.true;
      expect(editContact.paneTitle).to.include('Edit contact');
      expect(editContact.noteField).to.be.equal(TEST_NOTE);
    });
  });

  describe('Save contact', () => {
    beforeEach(async function () {
      await editContact.urlForm.removeUrlButton();
      await editContact.saveButton.click();
      await viewContact.whenLoaded();
    });

    it('Save and close contact form', () => {
      expect(editContact.isPresent).to.be.false;
      expect(viewContact.isPresent).to.be.true;
    });
  });

  describe('click close button', () => {
    beforeEach(async function () {
      await editContact.closeButton.click();
      await viewContact.whenLoaded();
    });

    it('contact view pane should be presented', () => {
      expect(viewContact.isPresent).to.be.true;
    });
  });
});
