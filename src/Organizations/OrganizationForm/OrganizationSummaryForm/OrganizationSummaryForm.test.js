import React from 'react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { organization, organizationTypes } from 'fixtures';
import { QueryClient, QueryClientProvider } from 'react-query';
import OrganizationSummaryForm from './OrganizationSummaryForm';

import {
  useTypes,
  useVendorCodeGeneratorSettings,
} from '../../../common/hooks';

jest.mock('../../../common/hooks', () => ({
  useTypes: jest.fn(),
  useVendorCodeGeneratorSettings: jest.fn(),
}));

jest.mock('@folio/service-interaction', () => ({
  NumberGeneratorModalButton: ({ callback }) => (
    <button
      onClick={() => callback('abc123')}
      type="button"
    >
      NumberGeneratorModalButton
    </button>
  ),
}));

const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationSummaryForm
          initialValues={organization}
        />
      </form>
    );
  },
);

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

describe('OrganizationSummaryForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
    useTypes
      .mockClear()
      .mockReturnValue({ organizationTypes, totalRecords: organizationTypes.length });
    useVendorCodeGeneratorSettings.mockReturnValue({
      isUseGenerator: false,
      isUseBoth: false,
      isUseTextfield: false,
    });
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  // TODO: release blocker: enable after release
  xit('should render correct structure', async () => {
    const { asFragment } = renderForm({ initialValues: organization });

    await screen.findByText('ui-organizations.summary.name');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render active type', async () => {
    renderForm({ initialValues: organization });

    expect(document.querySelector('#multiselect-option-list-organizations-type')).toBeInTheDocument();
    expect(document.querySelectorAll('#multiselect-option-list-organizations-type [role=option]').length).toEqual(1);
  });

  it('should show the label of the selected initial active value type once', async () => {
    renderForm({ initialValues: organization });

    const selectedType = await screen.findAllByText('Book trade');

    expect((selectedType).length).toEqual(1);
  });

  it('should not render the NumberGeneratorModalButton', async () => {
    renderForm();

    expect(screen.getByRole('textbox', { name: 'ui-organizations.summary.code' })).toBeEnabled();
    expect(screen.queryByRole('button', { name: 'NumberGeneratorModalButton' })).not.toBeInTheDocument();
  });

  it('should render the NumberGeneratorModalButton when setting=isUseGenerator', async () => {
    useVendorCodeGeneratorSettings.mockReturnValue({ isUseGenerator: true });

    renderForm();

    expect(screen.getByRole('textbox', { name: 'ui-organizations.summary.code' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'NumberGeneratorModalButton' })).toBeInTheDocument();
  });

  it('should render the NumberGeneratorModalButton when setting=isUseBoth', async () => {
    useVendorCodeGeneratorSettings.mockReturnValue({ isUseBoth: true });

    renderForm();

    expect(screen.getByRole('textbox', { name: 'ui-organizations.summary.code' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'NumberGeneratorModalButton' })).toBeInTheDocument();
  });

  it('should update vendor code field value when NumberGeneratorModalButton is clicked', async () => {
    useVendorCodeGeneratorSettings.mockReturnValue({ isUseBoth: true });

    renderForm();
    const button = screen.getByRole('button', { name: 'NumberGeneratorModalButton' });
    const input = screen.getByRole('textbox', { name: 'ui-organizations.summary.code' });

    expect(input).toHaveValue('');
    await userEvent.click(button);
    expect(input).toHaveValue('abc123');
  });
});
