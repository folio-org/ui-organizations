import { MemoryRouter } from 'react-router-dom';

import user from '@folio/jest-config-stripes/testing-library/user-event';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  useBankingAccountTypes,
  useCategories,
} from '../../../common/hooks';
import { OrganizationBankingInfoForm } from './OrganizationBankingInfoForm';

jest.mock('../../../common/hooks', () => ({
  ...jest.requireActual('../../../common/hooks'),
  useBankingAccountTypes: jest.fn(),
  useCategories: jest.fn(),
}));

const bankingAccountTypes = [
  { id: '1', name: 'First banking account type' },
  { id: '2', name: 'Second banking account type' },
];
const categories = [
  { id: '1', value: 'First category' },
  { id: '2', value: 'Second category' },
];

const FormWrapper = stripesFinalForm({
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
  validateOnBlur: true,
})(({ children }) => <form>{children}</form>);

const wrapper = ({ children }) => (
  <MemoryRouter>
    <FormWrapper onSubmit={jest.fn()}>
      {children}
    </FormWrapper>
  </MemoryRouter>
);

const renderOrganizationBankingInfoForm = (props = {}) => render(
  <OrganizationBankingInfoForm {...props} />,
  { wrapper },
);

describe('OrganizationBankingInfoForm', () => {
  beforeEach(() => {
    useBankingAccountTypes
      .mockClear()
      .mockReturnValue({ isFetching: false, bankingAccountTypes });
    useCategories
      .mockClear()
      .mockReturnValue({ isFetching: false, categories });
  });

  it('should provide banking account types options for the related field', async () => {
    renderOrganizationBankingInfoForm();

    await user.click(await screen.findByRole('button', { name: 'ui-organizations.button.bankingInformation.add' }));

    bankingAccountTypes.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
