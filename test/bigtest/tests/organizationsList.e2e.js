import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import {
  OrganizationDetailsInteractor,
  OrganizationsListInteractor,
} from '../interactors';

const ORGANIZATIONS_COUNT = 13;

describe('Organizations list', function () {
  setupApplication();

  this.timeout(10000);

  const orgsList = new OrganizationsListInteractor();
  const orgDetails = new OrganizationDetailsInteractor();

  beforeEach(function () {
    this.server.createList('organization', ORGANIZATIONS_COUNT);

    this.visit('/organizations');
  });

  it('is no results message label present', () => {
    expect(orgsList.isNoResultsMessageLabelPresent).to.equal(true);
  });

  it('displays create new organization button', () => {
    expect(orgsList.hasCreateOrganizationButton).to.be.true;
  });

  describe('search by poNumber', function () {
    beforeEach(async function () {
      await orgsList.filters.searchInput('TEST');
      await orgsList.filters.searchButton.click();
    });

    it('renders row for each organization from response', () => {
      expect(orgsList.isPresent).to.equal(true);
      expect(orgsList.organizationRows().length).to.be.equal(ORGANIZATIONS_COUNT);
    });

    describe('clicking on the first organization', function () {
      beforeEach(async function () {
        await orgsList.organizationRows(0).click();
      });

      it('loads the organization\'s details', function () {
        expect(orgDetails.$root).to.exist;
      });
    });
  });
});
