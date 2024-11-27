import { FieldArray } from 'react-final-form-arrays';
import { MemoryRouter } from 'react-router-dom';

import user from '@folio/jest-config-stripes/testing-library/user-event';
import {
  act,
  render,
  renderHook,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';
import stripesFinalForm from '@folio/stripes/final-form';
import { RepeatableFieldWithValidation } from '@folio/stripes-acq-components';

import { EVENT_EMITTER_EVENTS } from '../../../common/constants';
import {
  useBankingAccountTypes,
  useCategories,
  useEventEmitter,
} from '../../../common/hooks';
import CategoryDropdown from '../../../Utils/CategoryDropdown';
import { OrganizationBankingInfoForm } from './OrganizationBankingInfoForm';

jest.mock('../../../common/hooks', () => ({
  ...jest.requireActual('../../../common/hooks'),
  useBankingAccountTypes: jest.fn(),
  useCategories: jest.fn(),
}));

let form;

const bankingAccountTypes = [
  { id: '1', name: 'First banking account type' },
  { id: '2', name: 'Second banking account type' },
];
const categories = [
  { id: '1', value: 'First category' },
  { id: '2', value: 'Second category' },
];
const addresses = [{ id: 'address-id', categories: categories.map(({ id }) => id) }];
const initialFormValues = { addresses };

const FormWrapper = stripesFinalForm({
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
  validateOnBlur: true,
})(({ children, ...props }) => {
  form = props.form;

  return <form>{children}</form>;
});

const renderOrganizationBankingInfoForm = (props = {}, initialValues = initialFormValues) => render(
  <FormWrapper
    onSubmit={jest.fn()}
    initialValues={initialValues}
  >
    <>
      <FieldArray
        component={RepeatableFieldWithValidation}
        name="addresses"
        renderField={(name) => (
          <CategoryDropdown
            dropdownVendorCategories={categories}
            name={name}
          />
        )}
      />
      <OrganizationBankingInfoForm {...props} />
    </>
  </FormWrapper>,
  { wrapper: MemoryRouter },
);

const addField = async () => user.click(await screen.findByRole('button', { name: 'ui-organizations.button.bankingInformation.add' }));

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

    await addField();
    await user.click(screen.getAllByText('stripes-components.selection.controlLabel')[1]);

    bankingAccountTypes.forEach(({ name }) => {
      expect(screen.getAllByText(name)[0]).toBeInTheDocument();
    });
  });

  describe('Interaction with \'Addresses\' categories fields', () => {
    it('should render categories options based on selected address categories', async () => {
      renderOrganizationBankingInfoForm();

      await addField();
      await user.click(screen.getByRole('button', { name: 'ui-organizations.data.bankingInformation.addressCategory' }));

      categories.forEach(({ value }) => {
        expect(screen.getAllByText(value)[0]).toBeInTheDocument();
      });
    });

    it('should handle change address categories event', async () => {
      const { result } = renderHook(() => useEventEmitter());

      renderOrganizationBankingInfoForm();

      act(() => {
        form.change('addresses[0].categories', []);
        result.current.emit(EVENT_EMITTER_EVENTS.ADDRESS_CATEGORY_CHANGED);
      });

      await addField();
      await user.click(screen.getAllByText('stripes-components.selection.controlLabel')[0]);

      categories.forEach(({ value }) => {
        expect(within(screen.getByTestId('banking-information-card')).queryByText(value)).not.toBeInTheDocument();
      });
    });
  });
});
