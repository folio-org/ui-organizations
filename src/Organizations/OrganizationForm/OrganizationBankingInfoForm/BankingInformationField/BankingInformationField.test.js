import { Form } from 'react-final-form';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { BankingInformationField } from './BankingInformationField';

const defaultProps = {
  bankingAccountTypeOptions: [],
  categories: [],
  fields: { forEach: jest.fn },
  index: 3,
  name: 'bankingInfo[3]',
};

const wrapper = ({ children }) => (
  <Form
    onSubmit={jest.fn()}
    render={() => children}
  />
);

const renderBankingInformationField = (props = {}) => render(
  <BankingInformationField
    {...defaultProps}
    {...props}
  />,
  { wrapper },
);

describe('BankingInformationField', () => {
  it('should render banking information item fields', () => {
    renderBankingInformationField();

    expect(screen.getByText('ui-organizations.data.bankingInformation.isPrimary')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.data.bankingInformation.bankName')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.data.bankingInformation.bankAccountNumber')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.data.bankingInformation.transitNumber')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.data.bankingInformation.addressCategory')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.data.bankingInformation.accountType')).toBeInTheDocument();
    expect(screen.getByText('ui-organizations.data.bankingInformation.notes')).toBeInTheDocument();
  });
});
