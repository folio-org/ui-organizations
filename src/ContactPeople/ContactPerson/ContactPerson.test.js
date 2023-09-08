import React from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { contact } from 'fixtures';
import ContactPerson from './ContactPerson';

const defaultProps = {
  categories: [{ value: 'Customer Service', id: 'f52ceea4-8e35' }],
  contact,
  withCollapsing: false,
};
const renderContactPerson = (props = defaultProps) => render(
  <ContactPerson {...props} />,
  { wrapper: MemoryRouter },
);

describe('ContactPerson', () => {
  beforeEach(() => {
    global.document.createRange = global.document.originalCreateRange;
  });

  afterEach(() => {
    global.document.createRange = global.document.mockCreateRange;
  });

  it('should render correct not collapsed structre', () => {
    const { asFragment } = renderContactPerson();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct collapsed structre', () => {
    const { asFragment } = renderContactPerson({ ...defaultProps, withCollapsing: true });

    expect(asFragment()).toMatchSnapshot();
  });
});
