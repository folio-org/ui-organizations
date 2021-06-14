import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import OrganizationAgreementsForm from './OrganizationAgreementsForm';

const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationAgreementsForm />
      </form>
    );
  },
);

const agreement = {
  discount: 0,
  name: 'Full price',
  notes: '',
  referenceUrl: '',
};
const renderForm = ({ initialValues = {} } = {}) => render(
  <TestForm
    onSubmit={jest.fn()}
    initialValues={initialValues}
  />,
  { wrapper: MemoryRouter },
);

describe('OrganizationAgreementsForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure with defined accounts', async () => {
    const { asFragment } = renderForm({ initialValues: { agreements: [agreement] } });

    await screen.findByText('ui-organizations.agreement.name');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct structure without accounts', async () => {
    const { asFragment } = renderForm();

    expect(asFragment()).toMatchSnapshot();
  });
});
