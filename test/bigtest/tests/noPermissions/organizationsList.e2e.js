import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import {
  OrganizationsListInteractor,
} from '../../interactors';

const ORGANIZATIONS_COUNT = 13;

describe('Organizations list without permissions', () => {
  setupApplication({
    hasAllPerms: false,
    permissions: {
    },
  });

  const orgsList = new OrganizationsListInteractor();

  beforeEach(function () {
    this.server.createList('organization', ORGANIZATIONS_COUNT);
    this.visit('/organizations');
  });

  it("doesn't show the list of organization items", () => {
    expect(orgsList.isPresent).to.equal(false);
  });
});
