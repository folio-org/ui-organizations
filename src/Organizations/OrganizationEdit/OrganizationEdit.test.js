import { QueryClient, QueryClientProvider } from 'react-query';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { useOrganization } from '@folio/stripes-acq-components';

import { useOrganizationBankingInformation } from '../../common/hooks';
import {
  SUBMIT_ACTION,
  SUBMIT_ACTION_FIELD_NAME,
} from '../constants';
import { OrganizationForm } from '../OrganizationForm';
import { useBankingInformationManager } from '../useBankingInformationManager';
import { OrganizationEdit } from './OrganizationEdit';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useOrganization: jest.fn(),
}));
jest.mock('../../common/hooks', () => ({
  ...jest.requireActual('../../common/hooks'),
  useOrganizationBankingInformation: jest.fn(),
}));
jest.mock('../OrganizationForm', () => ({
  OrganizationForm: jest.fn().mockReturnValue('OrganizationForm'),
}));
jest.mock('../useBankingInformationManager', () => ({
  useBankingInformationManager: jest.fn(),
}));

const organization = {
  name: 'Amazon',
  id: 'orgUid',
};

const bankingInformation = [{
  id: 'banking-information-id',
  bankName: 'bankName',
  isPrimary: true,
}];

const mutatorMock = {
  editOrganizationOrg: {
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

const getFieldState = jest.fn();
const manageBankingInformation = jest.fn();

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderOrganizationEdit = (props) => render(
  <OrganizationEdit
    match={matchMock}
    location={{}}
    history={historyMock}
    mutator={mutatorMock}
    {...props}
  />,
  { wrapper },
);

describe('OrganizationEdit', () => {
  beforeEach(() => {
    OrganizationForm.mockClear();

    getFieldState.mockClear();
    historyMock.push.mockClear();
    useOrganization.mockClear().mockReturnValue({
      organization,
      isFetching: false,
      refetch: jest.fn(),
    });
    mutatorMock.editOrganizationOrg.PUT.mockClear();

    useOrganizationBankingInformation
      .mockClear()
      .mockReturnValue({ bankingInformation, isLoading: false });
    useBankingInformationManager
      .mockClear()
      .mockReturnValue({ manageBankingInformation });
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
    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(mutatorMock.editOrganizationOrg.PUT).toHaveBeenCalled();
  });

  it('should handle banking information on form submit', async () => {
    mutatorMock.editOrganizationOrg.PUT.mockReturnValue(Promise.resolve({ id: 'orgUid' }));

    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');
    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(manageBankingInformation).toHaveBeenCalled();
  });

  it('should restart and refetch data on saveAndKeepEditing', async () => {
    const refetch = jest.fn();
    const restart = jest.fn();

    useOrganization.mockReturnValue({
      organization,
      isFetching: false,
      refetch,
    });

    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');
    await OrganizationForm.mock.calls[0][0].onSubmit({
      [SUBMIT_ACTION_FIELD_NAME]: SUBMIT_ACTION.saveAndKeepEditing,
    }, { getFieldState, restart });

    expect(refetch).toHaveBeenCalled();
    expect(restart).toHaveBeenCalled();
  });
});
