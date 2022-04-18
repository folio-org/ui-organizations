import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import { KeyValue, TextField } from '@folio/stripes/components';

import { CredentialsContext } from '../Credentials';

export const CredentialsField = ({
  disabled,
  value,
  ...props
}) => {
  const {
    hasPerm,
    isCredsVisible,
    isKeyValue,
  } = useContext(CredentialsContext);

  const isVisible = isCredsVisible && hasPerm;

  return (
    <>
      {
        isKeyValue
          ? (
            <KeyValue
              {...props}
            >
              {isVisible ? (props.children ?? value) : '********'}
            </KeyValue>
          )
          : (
            <Field
              data-testid="credentials-field"
              component={TextField}
              type={isVisible ? 'text' : 'password'}
              fullWidth
              value={value}
              {...props}
              disabled={!hasPerm || disabled}
            />
          )
      }
    </>
  );
};

CredentialsField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  disabled: PropTypes.bool,
  value: PropTypes.string,
};
