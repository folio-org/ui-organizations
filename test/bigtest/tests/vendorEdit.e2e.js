import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationEditInteractor,
} from '../interactors';

describe('Vendor org edit', () => {
  setupApplication();

  const orgEdit = new OrganizationEditInteractor();
  let unit = null;

  beforeEach(function () {
    unit = this.server.create('unit', { name: 'Test' });
  });

  describe('check accounts section with saved accounts', () => {
    beforeEach(async function () {
      const org = this.server.create('organization', {
        name: 'org with account',
        isVendor: true,
        accounts: [{
          name: 'test acc',
          accountNo: '54354',
          paymentMethod: 'EFT',
          accountStatus: 'Active',
          libraryCode: '5646',
          libraryEdiCode: '5646',
          acqUnitIds: [unit.id],
        }],
      });

      this.visit(`/organizations/${org.id}/edit`);
      await orgEdit.whenLoaded();
      await orgEdit.accountsSection.headerButton.click();
    });

    it('display selected acq units', () => {
      expect(orgEdit.accountsSection.acquisitionUnits.valueCount).to.equal(1);
    });
  });

  describe('check accounts section without accounts, try to add', () => {
    beforeEach(async function () {
      const org = this.server.create('organization', {
        name: 'org without accounts',
        isVendor: true,
      });

      this.visit(`/organizations/${org.id}/edit`);
      await orgEdit.whenLoaded();
      await orgEdit.accountsSection.headerButton.click();
    });

    it('display selected acq units', () => {
      expect(orgEdit.accountsSection.acquisitionUnitsIsPresent).to.be.false;
    });

    describe('click add and select acq unit', () => {
      beforeEach(async function () {
        await orgEdit.addAccountButton.click();
        await orgEdit.accountsSection.acquisitionUnits.clickControl();
        await orgEdit.whenAcqUnitsLoaded();
        await orgEdit.accountsSection.firstAcqUnitOption.click();
      });

      it('display selected acq units', () => {
        expect(orgEdit.accountsSection.acquisitionUnits.valueCount).to.equal(1);
      });
    });
  });
});
