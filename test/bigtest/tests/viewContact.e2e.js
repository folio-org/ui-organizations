import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import {
  ViewContactInteractor,
} from '../interactors';

describe('View contact', () => {
  setupApplication();

  const viewContact = new ViewContactInteractor();

  beforeEach(function () {
    const contact = this.server.create('contact');

    return this.visit(`/organizations/contacts/${contact.id}/view`, () => {
      expect(viewContact.$root).to.exist;
    });
  });

  describe('actions', () => {
    it('should be present', () => {
      expect(viewContact.actions.isPresent).to.be.true;
    });
  });

  describe('contact person section', () => {
    it('should be present', () => {
      expect(viewContact.contactPerson.isPresent).to.be.true;
    });
  });
});
