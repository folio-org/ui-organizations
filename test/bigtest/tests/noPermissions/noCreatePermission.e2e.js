import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import {
  OrganizationsListInteractor,
} from '../../interactors';

const ORGANIZATIONS_COUNT = 13;

describe('No create permission', () => {
  setupApplication({
    hasAllPerms: false,
    permissions: {
      'module.organizations.enabled': true,
      'ui-organizations.view': true,
      'ui-organizations.edit': true,
      'ui-organizations.create': false,
      'ui-organizations.delete': true,
      'ui-organizations.creds.view': true,
      'ui-organizations.creds.manage': true,
      'ui-organizations.settings': true,
    },
  });

  const orgsList = new OrganizationsListInteractor();

  beforeEach(function () {
    this.server.createList('organization', ORGANIZATIONS_COUNT);
    this.visit('/organizations');
  });

  it("doesn't show the list of organization items", () => {
    expect(orgsList.isPresent).to.equal(true);
  });

  it('hides create new organization button', () => {
    expect(orgsList.hasCreateOrganizationButton).to.be.false;
  });
});
