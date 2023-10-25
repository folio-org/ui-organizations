import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { useStripes } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';

import BankingAccountTypeSettings from './BankingAccountTypeSettings';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useStripes: jest.fn(),
}));

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
  clone: jest.fn(),
};

const renderCategorySettings = () => render(<BankingAccountTypeSettings />);

describe('BankingAccountTypeSettings', () => {
  beforeEach(() => {
    useStripes.mockReturnValue(stripesMock);
  });

  it('should render component', () => {
    renderCategorySettings();

    expect(screen.getByText('New'));
    expect(screen.getByText('ui-organizations.settings.bankingAccountTypes'));
  });

  it('should check action suppression', () => {
    renderCategorySettings();

    const { actionSuppressor } = ControlledVocab.mock.calls[0][0];

    expect(actionSuppressor.edit()).toBeFalsy();
    expect(actionSuppressor.delete()).toBeFalsy();
  });
});
