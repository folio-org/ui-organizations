import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { OrganizationForm } from '../OrganizationForm';
import { useBankingInformationManager } from '../useBankingInformationManager';
import { OrganizationCreate } from './OrganizationCreate';
import { SUBMIT_ACTION_FIELD_NAME, SUBMIT_ACTION } from '../constants';

jest.mock('../OrganizationForm', () => ({
  OrganizationForm: jest.fn().mockReturnValue('OrganizationForm'),
}));
jest.mock('../useBankingInformationManager', () => ({
  useBankingInformationManager: jest.fn(),
}));

const mutatorMock = {
  createOrganizationOrg: {
    POST: jest.fn(),
  },
};
const historyMock = {
  push: jest.fn(),
};

const getFieldState = jest.fn();
const manageBankingInformation = jest.fn();
const saveAndKeepEditingHandler = jest.fn();

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderOrganizationCreate = (props) => render(
  <OrganizationCreate
    location={{}}
    history={historyMock}
    mutator={mutatorMock}
    {...props}
  />,
  { wrapper },
);

describe('OrganizationCreate', () => {
  beforeEach(() => {
    OrganizationForm.mockClear();

    getFieldState.mockClear();
    historyMock.push.mockClear();
    manageBankingInformation.mockClear();
    mutatorMock.createOrganizationOrg.POST.mockClear();

    useBankingInformationManager
      .mockClear()
      .mockReturnValue({ manageBankingInformation });
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

  it('should save organization', async () => {
    mutatorMock.createOrganizationOrg.POST.mockReturnValue(Promise.resolve({ id: 'orgUid' }));

    renderOrganizationCreate();

    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(mutatorMock.createOrganizationOrg.POST).toHaveBeenCalled();
  });

  it('should handle banking information on form submit', async () => {
    mutatorMock.createOrganizationOrg.POST.mockReturnValue(Promise.resolve({ id: 'orgUid' }));

    renderOrganizationCreate();

    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(manageBankingInformation).toHaveBeenCalled();
  });

  it('should redirect to org edit page when save and keep editing is pressed', async () => {
    mutatorMock.createOrganizationOrg.POST.mockReturnValue(Promise.resolve({ id: 'orgUid' }));

    renderOrganizationCreate();

    await OrganizationForm.mock.calls[0][0].onSubmit({
      [SUBMIT_ACTION_FIELD_NAME]: SUBMIT_ACTION.saveAndKeepEditing,
    }, { getFieldState });

    await new Promise((resolve) => setTimeout(resolve));

    expect(historyMock.push.mock.calls[2][0].pathname).toBe('/organizations/orgUid/edit');
  });
});
