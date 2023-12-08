import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import stripesFinalForm from '@folio/stripes/final-form';

import { BankingInformationFieldArray } from './BankingInformationFieldArray';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  RepeatableFieldWithValidation: jest.fn(() => 'RepeatableFieldWithValidation'),
}));

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

const renderBankingInformationFieldArray = (props = {}) => render(
  <BankingInformationFieldArray {...props} />,
  { wrapper },
);

describe('OrganizationBankingInfoForm', () => {
  it('should render RepeatableFieldWithValidation', async () => {
    renderBankingInformationFieldArray();

    expect(screen.getByText('RepeatableFieldWithValidation')).toBeInTheDocument();
  });
});
