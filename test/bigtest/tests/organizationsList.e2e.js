import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrganizationsListInteractor from '../interactors/organizationsList';

const ORGANIZATIONS_COUNT = 13;

describe('Organizations list', () => {
  setupApplication();

  const orgsList = new OrganizationsListInteractor();

  beforeEach(function () {
    this.server.createList('organization', ORGANIZATIONS_COUNT);

    return this.visit('/organizations', () => {
      expect(orgsList.$root).to.exist;
    });
  });

  it('shows the list of organization items', () => {
    expect(orgsList.isPresent).to.equal(true);
  });

  it('renders row for each organization from response', () => {
    expect(orgsList.organizationRows().length).to.be.equal(ORGANIZATIONS_COUNT);
  });

  it('displays create new organization button', () => {
    expect(orgsList.hasCreateOrganizationButton).to.be.true;
  });
});
