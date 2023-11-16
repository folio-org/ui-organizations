import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { organization } from 'fixtures';
import {
  useBankingAccountTypes,
  useCategories,
  useOrganizationBankingInformation,
} from '../../../common/hooks';
import { OrganizationBankingInfo } from './OrganizationBankingInfo';

jest.mock('../../../common/hooks', () => ({
  ...jest.requireActual('../../../common/hooks'),
  useBankingAccountTypes: jest.fn(),
  useCategories: jest.fn(),
  useOrganizationBankingInformation: jest.fn(),
}));

const defaultProps = {
  organization,
};

const bankingAccountTypes = [
  { id: 'bank-acc-type-id-1', name: 'Acc type 1' },
  { id: 'bank-acc-type-id-2', name: 'Acc type 2' },
];

const categories = [
  { id: 'category-id-1', value: 'Category 1' },
  { id: 'category-id-2', value: 'Category 2' },
];

const bankingInformation = [
  {
    id: 'bank-info-id-1',
    isPrimary: true,
    bankName: 'Bank name 1',
    bankAccountNumber: 'Bank acc No 1',
    transitNumber: 't-1',
    accountTypeId: bankingAccountTypes[0].id,
    categoryId: categories[0].id,
    notes: 'Notes',
  },
  {
    id: 'bank-info-id-2',
    bankName: 'Bank name 2',
    accountTypeId: bankingAccountTypes[1].id,
    categoryId: categories[1].id,
  },
  {
    id: 'bank-info-id-3',
    bankName: 'Bank name 3',
    accountTypeId: 'deleted-acc-type-id',
    categoryId: 'deleted-category-id',
  },
  {
    id: 'bank-info-id-4',
    bankName: 'Bank name 4',
  },
];

const renderOrganizationBankingInfo = (props = {}) => render(
  <OrganizationBankingInfo
    {...defaultProps}
    {...props}
  />,
);

describe('OrganizationBankingInfo', () => {
  beforeEach(() => {
    useBankingAccountTypes
      .mockClear()
      .mockReturnValue({ bankingAccountTypes, isFetching: false });
    useCategories
      .mockClear()
      .mockReturnValue({ categories, isFetching: false });
    useOrganizationBankingInformation
      .mockClear()
      .mockReturnValue({ bankingInformation, isFetching: false });
  });

  it('should render card for each of banking information items', () => {
    renderOrganizationBankingInfo();

    expect(screen.getAllByText(/^Bank name.*/)).toHaveLength(bankingInformation.length);
  });
});
