import { Form } from 'react-final-form';
import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Credentials } from '../Credentials';
import { CredentialsField } from './CredentialsField';

const defaultProps = {
  name: 'password',
  value: 'qwerty123',
};

const wrapper = ({ children }) => (
  <Form
    onSubmit={() => jest.fn()}
    render={() => children}
  />
);

const renderCredentialsField = (props = {}, isKeyValue = false) => render(
  <Credentials
    perm="permission-for-credentials"
    isKeyValue={isKeyValue}
  >
    {(renderToggle) => (
      <>
        <CredentialsField
          {...defaultProps}
          {...props}
        />
        {renderToggle()}
      </>
    )}
  </Credentials>,
  { wrapper },
);

describe('CredentialsField', () => {
  describe('as final-form Field', () => {
    let field;

    beforeEach(() => {
      renderCredentialsField();
      field = screen.getByTestId('credentials-field');
    });

    it('should render field with \'password\' type if credentials are hidden', () => {
      expect(field.type).toBe('password');
    });

    it('should render field with \'text\' type if credentials are visible', () => {
      const toggleBtn = screen.getByRole('button', { name: 'ui-organizations.edit.showCredentials' });

      user.click(toggleBtn);

      expect(field.type).toBe('text');
    });
  });

  describe('as key-value string', () => {
    beforeEach(() => {
      renderCredentialsField({}, true);
    });

    it('should not display value if credentials are hidden', () => {
      expect(screen.getByText(/[*]{3,}/)).toBeInTheDocument();
    });

    it('should display value if credentials are visible', () => {
      const toggleBtn = screen.getByRole('button', { name: 'ui-organizations.edit.showCredentials' });

      user.click(toggleBtn);

      expect(screen.getByText(defaultProps.value)).toBeInTheDocument();
    });
  });
});
