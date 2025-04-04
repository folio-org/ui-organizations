import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { QueryClient, QueryClientProvider } from 'react-query';
import OrganizationAccountsForm from './OrganizationAccountsForm';

const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationAccountsForm />
      </form>
    );
  },
);

const account = {
  accountNo: '1234',
  accountStatus: 'Active',
  acqUnitIds: [],
  appSystemNo: '',
  contactInfo: 'service@amazon.com',
  description: 'Monographic ordering unit account',
  libraryCode: 'COB',
  libraryEdiCode: '765987610',
  name: 'Monographic ordering unit account',
  notes: '',
  paymentMethod: 'Credit Card',
};
const queryClient = new QueryClient();

const renderForm = ({ initialValues = {} } = {}) => render(
  <QueryClientProvider client={queryClient}>
    <TestForm
      onSubmit={jest.fn()}
      initialValues={initialValues}
    />
  </QueryClientProvider>,
  { wrapper: MemoryRouter },
);

describe('OrganizationAccountsForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure with defined accounts', async () => {
    const { asFragment } = renderForm({ initialValues: { accounts: [account] } });

    await screen.findByText('ui-organizations.accounts.name');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct structure without accounts', async () => {
    const { asFragment } = renderForm();

    expect(asFragment()).toMatchSnapshot();
  });
});
