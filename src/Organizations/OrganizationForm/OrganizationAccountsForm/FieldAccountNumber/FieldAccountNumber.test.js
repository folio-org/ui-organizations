import React from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';
import { noop } from 'lodash';
import { Form } from 'react-final-form';

import { FieldAccountNumber } from './FieldAccountNumber';

const renderFieldAccountNumber = (props) => (render(
  <Form
    onSubmit={noop}
    render={() => (
      <FieldAccountNumber
        name="name"
        {...props}
      />
    )}
  />,
));

describe('FieldAccountNumber', () => {
  it('should display label', () => {
    const { getByText } = renderFieldAccountNumber();

    expect(getByText('ui-organizations.accounts.accountNumber')).toBeDefined();
  });
});
