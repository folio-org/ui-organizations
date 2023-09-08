import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { orgInterface } from 'fixtures';

import OrganizationInterfacesForm from './OrganizationInterfacesForm';

const mutatorMock = {
  interfacesManualFetch: {
    GET: jest.fn().mockReturnValue(Promise.resolve([orgInterface])),
  },
};
const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationInterfacesForm
          open
          stripes={{}}
          storedInterfaces={[orgInterface.id]}
          mutator={mutatorMock}
        />
      </form>
    );
  },
);

const defaultProps = {
  initialValues: {
    interfaces: [orgInterface.id],
  },
};
const renderForm = (props = defaultProps) => render(
  <TestForm
    onSubmit={jest.fn()}
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('OrganizationInterfacesForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', async () => {
    const { asFragment } = renderForm();

    await screen.findByText('ui-organizations.interface.name');

    expect(asFragment()).toMatchSnapshot();
  });
});
