import React from 'react';
import { render, screen } from '@testing-library/react';

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
      onClick={() => {
        preCreateHook();
        listSuppressor();
      }}
    >
      New
    </button>
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
});
