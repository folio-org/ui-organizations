import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import stripesFinalForm from '@folio/stripes/final-form';

import { DICT_CATEGORIES } from '../../../common/constants';
import OrganizationContactInfoFormContainer from './OrganizationContactInfoFormContainer';
// eslint-disable-next-line react/prop-types
jest.mock('@folio/stripes-components/lib/AutoSuggest', () => ({ input }) => <input {...input} />);

const mutatorMock = {
  [DICT_CATEGORIES]: {
    GET: jest.fn().mockReturnValue(Promise.resolve([
      { value: 'Customer Service', id: 'category1' },
      { value: 'Custom', id: 'category2' },
    ])),
  },
};
const TestForm = stripesFinalForm({})(
  () => {
    return (
      <form>
        <OrganizationContactInfoFormContainer defaultLanguage="en" mutator={mutatorMock} />
      </form>
    );
  },
);

const org = {
  addresses: [{
    addressLine1: '1 Centerpiece Blvd.',
    addressLine2: 'P.O. Box 15550',
    city: 'New Castle',
    stateRegion: 'DE',
    zipCode: '19720-5550',
    country: 'USA',
    isPrimary: true,
    categories: ['category2'],
    language: 'English',
  }],
  phoneNumbers: [{
    phoneNumber: '1-888-238-22090',
    categories: [],
    isPrimary: true,
    language: 'English',
  }],
  emails: [{
    value: 'cust.service03@amazon.com',
    description: 'customer service',
    isPrimary: true,
    categories: [],
    language: 'English',
  }],
  urls: [{
    value: 'https://www.amazon.com',
    description: 'main website',
    language: 'en-us',
    isPrimary: true,
    categories: ['category1'],
    notes: '',
  }],
};
const renderForm = ({ initialValues = {} } = {}) => render(
  <TestForm
    onSubmit={jest.fn()}
    initialValues={initialValues}
  />,
  { wrapper: MemoryRouter },
);

describe('OrganizationContactInfoForm', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct structure with defined contacts', async () => {
    const { asFragment } = renderForm({ initialValues: org });

    await screen.findByTestId('org-contacts-info-form');

    expect(asFragment()).toMatchSnapshot();
  });
});
