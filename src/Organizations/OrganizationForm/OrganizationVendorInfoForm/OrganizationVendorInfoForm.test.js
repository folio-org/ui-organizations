import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { organization } from '../../../../test/jest/fixtures';

import OrganizationVendorInfoForm from './OrganizationVendorInfoForm';

const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationVendorInfoForm />
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

describe('OrganizationVendorInfoForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', async () => {
    const { asFragment } = renderForm({ initialValues: organization });

    await screen.findByText('ui-organizations.vendorInfo.paymentMethod');

    expect(asFragment()).toMatchSnapshot();
  });
});
