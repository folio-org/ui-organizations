import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { organization } from 'fixtures';

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
    const { container, asFragment } = renderForm({ initialValues: organization });

    await screen.findByText('ui-organizations.vendorInfo.paymentMethod');

    container.querySelector('#vendor-info-accordion-set').removeAttribute('aria-multiselectable');

    expect(asFragment()).toMatchSnapshot();
  });
});
