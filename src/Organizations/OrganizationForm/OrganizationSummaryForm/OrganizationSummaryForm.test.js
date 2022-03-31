import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { organization, organizationTypes } from '../../../../test/jest/fixtures';
import OrganizationSummaryForm from './OrganizationSummaryForm';

import { useTypes } from '../../../common/hooks';

jest.mock('../../../common/hooks', () => ({
  useTypes: jest.fn(),
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

const renderForm = ({ initialValues = {} } = {}) => render(
  <TestForm
    onSubmit={jest.fn()}
    initialValues={initialValues}
  />,
  { wrapper: MemoryRouter },
);

describe('OrganizationSummaryForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
    useTypes
      .mockClear()
      .mockReturnValue({ orgTypes: { organizationTypes, totalRecords: organizationTypes.length } });
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', async () => {
    const { asFragment } = renderForm({ initialValues: organization });

    await screen.findByText('ui-organizations.summary.name');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render type', async () => {
    renderForm({ initialValues: organization });

    expect(document.querySelector('#multiselect-option-list-organizations-type')).toBeInTheDocument();
    expect(document.querySelectorAll('#multiselect-option-list-organizations-type [role=option]').length).toEqual(2);
  });

  it('should show the label of the selected initial value type twice', async () => {
    renderForm({ initialValues: organization });

    const selectedType = await screen.findAllByText('Book trade');

    expect((selectedType).length).toEqual(2);
  });
});
