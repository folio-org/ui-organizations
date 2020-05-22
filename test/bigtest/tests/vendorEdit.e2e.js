import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationEditInteractor,
} from '../interactors';

describe('Vendor org edit', () => {
  setupApplication();

  const orgEdit = new OrganizationEditInteractor();

  beforeEach(async function () {
    const unit = this.server.create('unit', { name: 'Test' });

    const org = this.server.create('organization', {
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
  });

  describe('accounts section', () => {
    beforeEach(async function () {
      await orgEdit.accountsSection.headerButton.click();
    });

    it('display selected acq units', () => {
      expect(orgEdit.accountsSection.acquisitionUnits.valueCount).to.equal(1);
    });
  });
});
