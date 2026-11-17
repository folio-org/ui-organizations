import { MemoryRouter } from 'react-router';

import { render, screen, within } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';
import stripesFinalForm from '@folio/stripes/final-form';

import { EdiForm } from './EdiForm';

const acqMethods = [
  { id: 'active-id', value: 'Active method' },
  { id: 'saved-deprecated-id', value: 'Saved old method', deprecated: true },
  { id: 'other-deprecated-id', value: 'Other old method', deprecated: true },
];

// The test intl renders message ids: deprecated methods get this label
const DEPRECATED_LABEL = 'stripes-acq-components.acquisition_method.deprecatedSuffix';

const renderEdiForm = (savedAcqMethodIds = []) => {
  const TestForm = stripesFinalForm({})(() => (
    <EdiForm
      acqMethods={acqMethods}
      initialAcqMethods={savedAcqMethodIds}
    />
  ));

  return render(
    <TestForm
      initialValues={{
        exportTypeSpecificParameters: {
          vendorEdiOrdersExportConfig: { ediConfig: { defaultAcquisitionMethods: savedAcqMethodIds } },
        },
      }}
      onSubmit={jest.fn()}
    />,
    { wrapper: MemoryRouter },
  );
};

// The multi-select of the default acquisition methods is the only listbox in the form
const getAcqMethodOptions = () => within(screen.getByRole('listbox')).getAllByRole('option');
const getOptionValues = () => getAcqMethodOptions().map((option) => option.value);

describe('EdiForm', () => {
  it('should not offer deprecated acquisition methods for a new selection', () => {
    renderEdiForm();

    expect(getOptionValues()).toEqual(['active-id']);
  });

  it('should keep the saved deprecated acquisition methods, marked as deprecated', () => {
    renderEdiForm(['active-id', 'saved-deprecated-id']);

    expect(getOptionValues()).toEqual(['active-id', 'saved-deprecated-id']);
    expect(within(screen.getByRole('listbox')).getByRole('option', { name: DEPRECATED_LABEL }))
      .toHaveValue('saved-deprecated-id');
  });

  it('should keep a saved deprecated acquisition method selectable after it was deselected', async () => {
    renderEdiForm(['saved-deprecated-id']);

    await user.deselectOptions(screen.getByRole('listbox'), 'saved-deprecated-id');

    expect(getOptionValues()).toEqual(['active-id', 'saved-deprecated-id']);
    expect(getAcqMethodOptions().filter((option) => option.selected)).toEqual([]);
  });

  it('should not offer deprecated acquisition methods when the saved methods are empty (null)', () => {
    renderEdiForm(null);

    expect(getOptionValues()).toEqual(['active-id']);
  });
});
