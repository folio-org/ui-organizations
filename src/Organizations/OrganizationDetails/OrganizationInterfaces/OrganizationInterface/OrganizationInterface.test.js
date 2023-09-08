import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

import OrganizationInterfaceContainer from './OrganizationInterfaceContainer';

const orgInterface = {
  name: 'Interface',
};
const mutatorMock = {
  viewVendorCreds: {
    GET: jest.fn(),
  },
};
const renderOrganizationInterfaceContainer = () => render(
  <OrganizationInterfaceContainer mutator={mutatorMock} item={orgInterface} />,
);

describe('OrganizationInterface', () => {
  beforeEach(() => {
    mutatorMock.viewVendorCreds.GET.mockClear();
  });

  it('should display interface', () => {
    renderOrganizationInterfaceContainer();

    expect(screen.getByText(orgInterface.name)).toBeDefined();
  });

  it('should display show creds button', () => {
    renderOrganizationInterfaceContainer();

    expect(screen.getByText('ui-organizations.edit.showCredentials')).toBeDefined();
  });

  it('should show creds when button is pressed', async () => {
    const creds = { username: 'Mick', password: 'Pass' };

    mutatorMock.viewVendorCreds.GET.mockReturnValue(Promise.resolve(creds));

    renderOrganizationInterfaceContainer();

    await user.click(screen.getByText('ui-organizations.edit.showCredentials'));

    await screen.findByText('ui-organizations.interface.username');

    expect(screen.getByText(creds.username)).toBeDefined();
    expect(screen.getByText(creds.password)).toBeDefined();
  });
});
