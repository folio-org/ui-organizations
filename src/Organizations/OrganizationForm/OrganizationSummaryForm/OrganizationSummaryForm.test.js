import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { organization } from '../../../../test/jest/fixtures';

import OrganizationSummaryForm from './OrganizationSummaryForm';

const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationSummaryForm initialValues={organization} />
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
});
