import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { organization } from '../../../../test/jest/fixtures';

import OrganizationSummaryForm from './OrganizationSummaryForm';

const organizationTypesMock = [
  {
    'id': 'f04c7277-0019-43cf-84b3-02d894a9d81a',
    'name': 'Auction house',
    'status': 'Active',
  },
  {
    'id': 'e7e9af00-c12c-448f-8ad1-d15ff209605a',
    'name': 'Book trade',
    'status': 'Inactive',
  },
];

const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationSummaryForm
          initialValues={organization}
          organizationTypes={organizationTypesMock}
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
});
