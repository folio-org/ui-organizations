import React from 'react';
import { render, screen } from '@testing-library/react';

import OrganizationInterfacesContainer from './OrganizationInterfacesContainer';

jest.mock('./OrganizationInterface', () => ({
  OrganizationInterfaceContainer: ({ item }) => `OrganizationInterfaceContainer ${item.id}`,
}));

const mutatorMock = {
  organizationDetailsInfaces: {
    GET: jest.fn(),
  },
};
const renderOrganizationInterfacesContainer = () => render(
  <OrganizationInterfacesContainer mutator={mutatorMock} interfaceIds={['id1']} />,
);

describe('OrganizationInterfaces', () => {
  beforeEach(() => {
    mutatorMock.organizationDetailsInfaces.GET.mockClear();
  });

  it('should display empty interfaces message in case no available', async () => {
    mutatorMock.organizationDetailsInfaces.GET.mockReturnValue(Promise.reject());

    renderOrganizationInterfacesContainer();

    await screen.findByText('ui-organizations.interface.noInterfaceAvail');

    expect(screen.getByText('ui-organizations.interface.noInterfaceAvail')).toBeDefined();
  });

  it('should display interfaces', async () => {
    const interfaces = [{ id: 'interface1' }, { id: 'interface2' }];

    mutatorMock.organizationDetailsInfaces.GET.mockReturnValue(Promise.resolve(interfaces));

    renderOrganizationInterfacesContainer();

    await screen.findByTestId('interfaces-list');

    interfaces.forEach(({ id }) => {
      expect(screen.getByText(`OrganizationInterfaceContainer ${id}`)).toBeDefined();
    });
  });
});
