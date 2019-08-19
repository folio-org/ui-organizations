import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import { OrganizationSettingsInteractor } from '../../interactors';

describe('No manage settings permission', () => {
  setupApplication({
    hasAllPerms: false,
    permissions: {
      'module.organizations.enabled': true,
      'settings.organizations.enabled': true,
      'ui-organizations.basic.view': true,
      'ui-organizations.view': true,
      'ui-organizations.edit': true,
      'ui-organizations.create': true,
      'ui-organizations.delete': true,
      'ui-organizations.creds.view': true,
      'ui-organizations.creds.manage': true,
      'ui-organizations.settings': false,
    },
  });

  const orgSettings = new OrganizationSettingsInteractor();

  beforeEach(function () {
    this.visit('/settings/organizations/category');
  });

  it('disables New category button', () => {
    expect(orgSettings.buttonNewCategory.isDisabled).to.be.true;
  });
});
