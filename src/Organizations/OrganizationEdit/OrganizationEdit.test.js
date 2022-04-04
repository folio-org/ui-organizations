import React from 'react';
import { render, screen } from '@testing-library/react';

import { OrganizationForm } from '../OrganizationForm';

import { OrganizationEdit } from './OrganizationEdit';

jest.mock('../OrganizationForm', () => ({
  OrganizationForm: jest.fn().mockReturnValue('OrganizationForm'),
}));

const organization = {
  name: 'Amazon',
  id: 'orgUid',
};
const mutatorMock = {
  editOrganizationOrg: {
    GET: jest.fn(),
    PUT: jest.fn(),
  },
};
const historyMock = {
  push: jest.fn(),
};
const matchMock = {
  params: {
    id: organization.id,
  },
};
const renderOrganizationEdit = (props) => render(
  <OrganizationEdit
    match={matchMock}
    location={{}}
    history={historyMock}
    mutator={mutatorMock}
    {...props}
  />,
);

describe('OrganizationEdit', () => {
  beforeEach(() => {
    OrganizationForm.mockClear();

    historyMock.push.mockClear();
    mutatorMock.editOrganizationOrg.GET.mockClear().mockReturnValue(Promise.resolve(organization));
    mutatorMock.editOrganizationOrg.PUT.mockClear();
  });

  it('should display organization form', async () => {
    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');

    expect(screen.getByText('OrganizationForm')).toBeDefined();
  });

  it('should redirect to org details when form is closed', async () => {
    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');

    OrganizationForm.mock.calls[0][0].cancelForm();

    expect(historyMock.push.mock.calls[0][0].pathname).toBe(`/organizations/view/${organization.id}`);
  });

  it('should save organization', async () => {
    mutatorMock.editOrganizationOrg.PUT.mockReturnValue(Promise.resolve({ id: 'orgUid' }));

    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');

    OrganizationForm.mock.calls[0][0].onSubmit({});
  });
});
