import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import Application from '../../interactors/application';

describe('Application without permissions', () => {
  const app = new Application();

  setupApplication({
    hasAllPerms: false,
    permissions: {
      'module.organizations.enabled': true,
    },
  });

  beforeEach(function () {
    this.visit('/');
  });

  it('renders correctly', () => {
    expect(app.isPresent).to.be.true;
  });
});
