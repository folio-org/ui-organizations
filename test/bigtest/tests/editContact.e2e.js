import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import { CreateContactInteractor } from '../interactors';

describe('Edit contact', () => {
  setupApplication();

  const editContact = new CreateContactInteractor();

  beforeEach(function () {
    const contact = this.server.create('contact');
    const organization = this.server.create('organization', {
      contacts: [contact.id],
    });

    return this.visit(`/organizations/${organization.id}/contacts/${contact.id}/edit`, () => {
      expect(editContact.$root).to.exist;
    });
  });

  describe('Edit contact form', () => {
    it('edit contact form should be present', () => {
      expect(editContact.saveButton.isPresent).to.be.true;
      expect(editContact.saveButton.isDisabled).to.be.true;
      expect(editContact.paneTitle).to.include('Edit contact');
    });
  });

  describe('Save contact', () => {
    beforeEach(async function () {
      await editContact.urlForm.removeUrlButton();
      await editContact.saveButton.click();
    });

    it('Save and close contact form', () => {
      expect(editContact.isPresent).to.be.false;
    });
  });
});
