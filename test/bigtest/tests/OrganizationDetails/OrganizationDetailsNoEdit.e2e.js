import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { VIEW_ORG_DETAILS } from '../../../../src/common/constants';
import setupApplication from '../../helpers/setup-application';
import { OrganizationDetailsInteractor } from '../../interactors';

const ORGANIZATIONS_COUNT = 13;
const TEST_NOTE = 'Test note';

describe('Organization details - edit permission disabled', () => {
  setupApplication({
    hasAllPerms: false,
    permissions: {
      'module.organizations.enabled': true,
      'organizations.organizations.item.get': true,
      'organizations.organizations.item.put': false,
    },
  });

  const orgDetails = new OrganizationDetailsInteractor();

  beforeEach(function () {
    const vendorInterface = this.server.create('interface');
    const organizations = this.server.createList(
      'organization',
      ORGANIZATIONS_COUNT,
      { interfaces: [vendorInterface.id] },
    );
    const orgId = organizations[0].id;

    this.server.create('contact', { notes: TEST_NOTE });

    this.visit(`${VIEW_ORG_DETAILS}${orgId}`);
  });

  it('should not display edit button', () => {
    expect(orgDetails.editOrganizationButton.isPresent).to.be.false;
  });
});
