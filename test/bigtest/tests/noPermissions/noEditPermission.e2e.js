import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { VIEW_ORG_DETAILS } from '../../../../src/common/constants';
import setupApplication from '../../helpers/setup-application';
import { OrganizationDetailsInteractor } from '../../interactors';

const ORGANIZATIONS_COUNT = 13;

describe('No edit permission', () => {
  setupApplication({
    hasAllPerms: false,
    permissions: {
      'module.organizations.enabled': true,
      'ui-organizations.basic.view': true,
      'ui-organizations.view': true,
      'ui-organizations.edit': false,
      'ui-organizations.create': false,
      'ui-organizations.delete': false,
      'ui-organizations.creds.view': true,
      'ui-organizations.creds.manage': true,
      'ui-organizations.settings': true,
    },
  });

  const orgDetails = new OrganizationDetailsInteractor();

  beforeEach(function () {
    const organizations = this.server.createList(
      'organization',
      ORGANIZATIONS_COUNT,
    );
    const orgId = organizations[0].id;

    this.visit(`${VIEW_ORG_DETAILS}${orgId}`);
  });

  describe('click on header', () => {
    beforeEach(async function () {
      await orgDetails.actions.toggle.click();
    });

    it('hides edit button', () => {
      expect(orgDetails.actions.edit.isPresent).to.be.false;
    });
  });
});
