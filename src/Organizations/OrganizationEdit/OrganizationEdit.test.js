import { QueryClient, QueryClientProvider } from 'react-query';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { useOrganizationBankingInformation } from '../../common/hooks';
import { OrganizationForm } from '../OrganizationForm';
import { OrganizationEdit } from './OrganizationEdit';

jest.mock('../../common/hooks', () => ({
  ...jest.requireActual('../../common/hooks'),
  useOrganizationBankingInformation: jest.fn(),
}));
jest.mock('../OrganizationForm', () => ({
  OrganizationForm: jest.fn().mockReturnValue('OrganizationForm'),
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

const getFieldState = jest.fn();

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
    mutatorMock.editOrganizationOrg.GET.mockClear().mockReturnValue(Promise.resolve(organization));
    mutatorMock.editOrganizationOrg.PUT.mockClear();
    useOrganizationBankingInformation
      .mockClear()
      .mockReturnValue({ bankingInformation, isLoading: false });
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

    OrganizationForm.mock.calls[0][0].onSubmit({}, { getFieldState });
  });
});
