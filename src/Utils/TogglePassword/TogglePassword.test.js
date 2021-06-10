import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import TogglePassword from './TogglePassword';

jest.mock('react-final-form', () => ({
  // eslint-disable-next-line
  Field: ({ component, ...rest }) => {
    const Component = component;

    return <Component {...rest} />;
  },
}));

const renderTogglePassword = () => render(<TogglePassword />);

describe('TogglePassword', () => {
  it('should display password field', () => {
    renderTogglePassword();

    expect(screen.getByText('ui-organizations.edit.password')).toBeDefined();
  });

  it('should hide password value by default', () => {
    renderTogglePassword();

    expect(screen.getByTestId('password-field').type).toBe('password');
  });

  it('should show password value when toggle button is pressed', () => {
    renderTogglePassword();

    user.click(screen.getByText('ui-organizations.edit.show'));

    expect(screen.getByTestId('password-field').type).toBe('text');
  });
});
