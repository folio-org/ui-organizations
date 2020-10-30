import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import { INTERFACE_TYPES } from '../../../src/common/constants';
import { InterfaceEditInteractor } from '../interactors';

const validationURLMessage = 'URL is not valid';

describe('Edit interface', () => {
  setupApplication();

  const page = new InterfaceEditInteractor();

  beforeEach(async function () {
    const interfaceMock = this.server.create('interface');
    const organization = this.server.create('organization', {
      interfaces: [interfaceMock.id],
    });

    this.visit(`/organizations/${organization.id}/interface/${interfaceMock.id}/edit`);
    await page.whenLoaded();
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
      await page.selectType(INTERFACE_TYPES);
      await page.saveButton.click();
    });

    it('interface form is closed', () => {
      expect(page.isPresent).to.be.false;
    });
  });

  describe('validate interface URL', () => {
    beforeEach(async function () {
      await page.name.fill('name');
      await page.url('invalid URL');
      await page.saveButton.click();
    });

    it('displays error message', function () {
      expect(page.validationMessage).to.include(validationURLMessage);
    });
  });
});
