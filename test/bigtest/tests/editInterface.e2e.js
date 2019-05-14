import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import { InterfaceEditInteractor } from '../interactors';

describe('Edit interface', () => {
  setupApplication();

  const page = new InterfaceEditInteractor();

  beforeEach(function () {
    const interfaceMock = this.server.create('interface');
    const organization = this.server.create('organization', {
      interfaces: [interfaceMock.id],
    });

    this.visit(`/organizations/${organization.id}/interface/${interfaceMock.id}/edit`);
  });

  it('displays edit interface form', () => {
    expect(page.$root).to.exist;
    expect(page.isPresent).to.be.true;
    expect(page.saveButton.isPresent).to.be.true;
    expect(page.saveButton.isDisabled).to.be.true;
  });

  describe('Save interface', () => {
    beforeEach(async function () {
      await page.name.fill('new name');
      await page.saveButton.click();
    });

    it('interface form is closed', () => {
      expect(page.isPresent).to.be.false;
    });
  });
});
