import React from 'react';
import { render, screen } from '@testing-library/react';

import { OrganizationForm } from '../OrganizationForm';

import { OrganizationCreate } from './OrganizationCreate';

jest.mock('../OrganizationForm', () => ({
  OrganizationForm: jest.fn().mockReturnValue('OrganizationForm'),
}));

const mutatorMock = {
  createOrganizationOrg: {
    POST: jest.fn(),
  },
};
const historyMock = {
  push: jest.fn(),
};
const renderOrganizationCreate = (props) => render(
  <OrganizationCreate
    location={{}}
    history={historyMock}
    mutator={mutatorMock}
    {...props}
  />,
);

describe('OrganizationCreate', () => {
  beforeEach(() => {
    OrganizationForm.mockClear();

    historyMock.push.mockClear();
    mutatorMock.createOrganizationOrg.POST.mockClear();
  });

  it('should display organization form', () => {
    renderOrganizationCreate();

    expect(screen.getByText('OrganizationForm')).toBeDefined();
  });

  it('should redirect to orgs list when create is cancelled', () => {
    renderOrganizationCreate();

    OrganizationForm.mock.calls[0][0].cancelForm();

    expect(historyMock.push.mock.calls[0][0].pathname).toBe('/organizations');
  });

  it('should redirect to org details when create is completed', () => {
    renderOrganizationCreate();

    OrganizationForm.mock.calls[0][0].cancelForm('orgUid');

    expect(historyMock.push.mock.calls[0][0].pathname).toBe('/organizations/view/orgUid');
  });

  it('should save organization', () => {
    mutatorMock.createOrganizationOrg.POST.mockReturnValue(Promise.resolve({ id: 'orgUid' }));

    renderOrganizationCreate();

    OrganizationForm.mock.calls[0][0].onSubmit({});
  });
});
