import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TypeSettings from './TypeSettings';

jest.mock('@folio/stripes-smart-components/lib/ControlledVocab', () => jest.fn(({
  rowFilter,
  label,
  rowFilterFunction,
  preCreateHook,
  listSuppressor,
}) => (
  <>
    {label}
    <div onChange={rowFilterFunction}>{rowFilter}</div>
    <button
      data-testid="button-new"
      type="button"
      onClick={() => {}}
    >
      New
    </button>
    <button
      data-testid="button-cancel"
      type="button"
      onClick={() => {}}
    >
      Cancel
    </button>
    <button
      data-testid="button-save"
      type="button"
      onClick={() => {}}
    >
      Save
    </button>
    <select
      id="select-type-status"
    />
  </>
)));

const stripesMock = {
  connect: component => component,
};

const renderTypeSettings = () => render(
  <TypeSettings
    stripes={stripesMock}
  />,
);

describe('TypeSettings component', () => {
  beforeEach(() => {
    renderTypeSettings();
  });

  it('should display label', async () => {
    expect(screen.getByText('ui-organizations.settings.types')).toBeInTheDocument();
  });

  it('should display new button', async () => {
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should display buttons and select box', async () => {
    userEvent.click(screen.getByText('New'));

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    expect(document.querySelector('#select-type-status')).toBeInTheDocument();
  });
});
