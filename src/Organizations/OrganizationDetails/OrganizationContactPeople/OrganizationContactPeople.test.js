import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import user from '@folio/jest-config-stripes/testing-library/user-event';

import { OrganizationContactPeopleContainer } from './OrganizationContactPeopleContainer';

const contact = {
  id: 'id1',
  firstName: 'Mark',
  lastName: 'J',
};
const historyMock = {
  push: jest.fn(),
};
const matchMock = {
  params: {
    id: 'id1',
  },
};
const mutatorMock = {
  organizationDetailsContacts: {
    GET: jest.fn(),
  },
};
const renderOrganizationContactPeopleContainer = () => render(
  <OrganizationContactPeopleContainer
    mutator={mutatorMock}
    contactsIds={[contact.id, 'removed']}
    history={historyMock}
    match={matchMock}
  />,
  { wrapper: MemoryRouter },
);

describe('OrganizationContactPeople', () => {
  beforeEach(() => {
    mutatorMock.organizationDetailsContacts.GET.mockClear();
  });

  it('should display contacts table when loaded', async () => {
    mutatorMock.organizationDetailsContacts.GET.mockReturnValue(Promise.resolve([contact]));

    renderOrganizationContactPeopleContainer();

    await screen.findByText('ui-organizations.contactPeople.name');

    expect(screen.getByText('ui-organizations.contactPeople.name')).toBeDefined();
    expect(screen.getByText('ui-organizations.contactPeople.categories')).toBeDefined();
    expect(screen.getByText('ui-organizations.contactPeople.email')).toBeDefined();
    expect(screen.getByText('ui-organizations.contactPeople.phone')).toBeDefined();
    expect(screen.getByText('ui-organizations.contactPeople.status')).toBeDefined();
  });

  it('should open contact details when row is pressed', async () => {
    historyMock.push.mockClear();
    mutatorMock.organizationDetailsContacts.GET.mockReturnValue(Promise.resolve([contact]));

    renderOrganizationContactPeopleContainer();

    await screen.findByText('ui-organizations.contactPeople.name');

    await user.click(screen.getByText(`${contact.lastName}, ${contact.firstName}`));

    expect(historyMock.push).toHaveBeenCalled();
  });
});
