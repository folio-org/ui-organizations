import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOrganization } from '@folio/stripes-acq-components';

import {
  useOrganizationBankingInformation,
  useOrganizationMutation,
} from '../../common/hooks';
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
  useOrganizationMutation: jest.fn(),
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
const refetchOrganization = jest.fn(() => Promise.resolve());
const updateOrganization = jest.fn(() => Promise.resolve());

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const defaultProps = {
  history: historyMock,
  match: matchMock,
  location: {},
};

const renderOrganizationEdit = (props = {}) => render(
  <OrganizationEdit
    {...defaultProps}
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
      refetch: refetchOrganization,
    });

    useBankingInformationManager.mockReturnValue({ manageBankingInformation });
    useOrganizationBankingInformation.mockReturnValue({ bankingInformation, isLoading: false });
    useOrganizationMutation.mockReturnValue({ updateOrganization });
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');
    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(updateOrganization).toHaveBeenCalled();
  });

  it('should handle banking information on form submit', async () => {
    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');
    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(manageBankingInformation).toHaveBeenCalled();
  });

  it('should restart and refetch data on saveAndKeepEditing', async () => {
    const restart = jest.fn();

    renderOrganizationEdit();

    await screen.findByText('OrganizationForm');
    await OrganizationForm.mock.calls[0][0].onSubmit({
      [SUBMIT_ACTION_FIELD_NAME]: SUBMIT_ACTION.saveAndKeepEditing,
    }, { getFieldState, restart });

    expect(refetchOrganization).toHaveBeenCalled();
    expect(restart).toHaveBeenCalled();
  });
});
