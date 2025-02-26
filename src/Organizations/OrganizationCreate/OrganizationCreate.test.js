import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  SUBMIT_ACTION_FIELD_NAME,
  SUBMIT_ACTION,
} from '../constants';
import { OrganizationForm } from '../OrganizationForm';
import { useBankingInformationManager } from '../useBankingInformationManager';
import { OrganizationCreate } from './OrganizationCreate';
import { useOrganizationMutation } from '../../common/hooks';

jest.mock('../../common/hooks', () => ({
  ...jest.requireActual('../../common/hooks'),
  useOrganizationMutation: jest.fn(),
}));
jest.mock('../OrganizationForm', () => ({
  OrganizationForm: jest.fn().mockReturnValue('OrganizationForm'),
}));
jest.mock('../useBankingInformationManager', () => ({
  useBankingInformationManager: jest.fn(),
}));

const historyMock = {
  push: jest.fn(),
};

const createOrganization = jest.fn(() => Promise.resolve({ id: 'orgUid' }));
const getFieldState = jest.fn();
const manageBankingInformation = jest.fn();

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const defaultProps = {
  history: historyMock,
  location: {},
};

const renderOrganizationCreate = (props = {}) => render(
  <OrganizationCreate
    {...defaultProps}
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

    useBankingInformationManager.mockReturnValue({ manageBankingInformation });
    useOrganizationMutation.mockReturnValue({ createOrganization });
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    renderOrganizationCreate();

    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(createOrganization).toHaveBeenCalled();
  });

  it('should handle banking information on form submit', async () => {
    renderOrganizationCreate();

    await OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });

    expect(manageBankingInformation).toHaveBeenCalled();
  });

  it('should redirect to org edit page when save and keep editing is pressed', async () => {
    renderOrganizationCreate();

    await OrganizationForm.mock.calls[0][0].onSubmit({
      [SUBMIT_ACTION_FIELD_NAME]: SUBMIT_ACTION.saveAndKeepEditing,
    }, { getFieldState });

    expect(historyMock.push.mock.calls[0][0].pathname).toBe('/organizations/orgUid/edit');
  });
});
