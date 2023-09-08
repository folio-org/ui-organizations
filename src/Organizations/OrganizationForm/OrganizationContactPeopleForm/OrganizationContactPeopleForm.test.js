import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { contact } from 'fixtures';

import { DICT_CATEGORIES } from '../../../common/constants';
import OrganizationContactPeopleForm from './OrganizationContactPeopleForm';

const mutatorMock = {
  contactsManualFetch: {
    GET: jest.fn().mockReturnValue(Promise.resolve([contact])),
  },
  [DICT_CATEGORIES]: {
    GET: jest.fn().mockReturnValue(Promise.resolve([])),
  },
};
const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationContactPeopleForm
          open
          stripes={{}}
          storedContactIds={[contact.id]}
          mutator={mutatorMock}
        />
      </form>
    );
  },
);

const defaultProps = {
  initialValues: {
    contacts: [contact.id],
  },
};
const renderForm = (props = defaultProps) => render(
  <TestForm
    onSubmit={jest.fn()}
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('OrganizationContactPeopleForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure', async () => {
    const { asFragment } = renderForm();

    await screen.findByText('ui-organizations.contactPeople.name');

    expect(asFragment()).toMatchSnapshot();
  });
});
