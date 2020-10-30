import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import { InterfaceEditInteractor } from '../interactors';

describe('Create interface', () => {
  setupApplication();

  const page = new InterfaceEditInteractor();

  beforeEach(async function () {
    const organization = this.server.create('organization', {
      interfaces: [],
    });

    this.visit(`/organizations/${organization.id}/interface/add`);
    await page.whenLoaded();
  });

  it('displays Create interface form', () => {
    expect(page.$root).to.exist;
    expect(page.isPresent).to.be.true;
    expect(page.paneTitle).to.include('Create');
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
