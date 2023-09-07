import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import { ControlledVocab } from '@folio/stripes/smart-components';

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
  hasPerm: jest.fn(() => true),
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

  it('should check action suppression', () => {
    const { actionSuppressor } = ControlledVocab.mock.calls[0][0];

    expect(stripesMock.hasPerm).toHaveBeenCalled();
    expect(actionSuppressor.edit()).toBeFalsy();
    expect(actionSuppressor.delete()).toBeFalsy();
  });
});
