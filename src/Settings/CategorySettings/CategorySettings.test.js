import { render } from '@folio/jest-config-stripes/testing-library/react';

import { ControlledVocab } from '@folio/stripes/smart-components';

import CategorySettings from './CategorySettings';

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

const renderCategorySettings = () => render(
  <CategorySettings
    stripes={stripesMock}
  />,
);

describe('CategorySettings', () => {
  it('should check action suppression', () => {
    renderCategorySettings();

    const { actionSuppressor } = ControlledVocab.mock.calls[0][0];

    expect(stripesMock.hasPerm).toHaveBeenCalled();
    expect(actionSuppressor.edit()).toBeFalsy();
    expect(actionSuppressor.delete()).toBeFalsy();
  });
});
