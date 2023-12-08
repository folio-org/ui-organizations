import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { BankingInformationCard } from './BankingInformationCard';

const bankingInformation = {
  isPrimary: true,
  bankName: 'Bank name',
  bankAccountNumber: 'Acc No',
  transitNumber: 't-123',
  categoryId: 'category-id',
  accountTypeId: 'acc-type-id',
  notes: 'Notes',
};

const defaultProps = {
  bankingAccountTypesMap: {
    [bankingInformation.accountTypeId]: { name: 'Acc type' },
  },
  bankingInformation,
  categoriesMap: {
    [bankingInformation.categoryId]: { value: 'Category' },
  },
};

const renderBankingInformationCard = (props = {}) => render(
  <BankingInformationCard
    {...defaultProps}
    {...props}
  />,
);

describe('BankingInformationCard', () => {
  it('should render banking information item values', () => {
    renderBankingInformationCard();

    expect(screen.getByText('ui-organizations.primaryItem')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.categoriesMap[bankingInformation.categoryId].value)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.bankingAccountTypesMap[bankingInformation.accountTypeId].name),
    ).toBeInTheDocument();
    expect(screen.getByText(bankingInformation.bankAccountNumber)).toBeInTheDocument();
    expect(screen.getByText(bankingInformation.bankName)).toBeInTheDocument();
    expect(screen.getByText(bankingInformation.notes)).toBeInTheDocument();
    expect(screen.getByText(bankingInformation.transitNumber)).toBeInTheDocument();
  });
});
