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
  const isDisabled = !hasPerm || disabled;
  const fieldType = isVisible ? 'text' : 'password';
  const keyValueString = isVisible ? (props.children ?? value) : '********';

  return (
    <>
      {
        isKeyValue
          ? (
            <KeyValue
              {...props}
            >
              {keyValueString}
            </KeyValue>
          )
          : (
            <Field
              data-testid="credentials-field"
              component={TextField}
              type={fieldType}
              fullWidth
              value={value}
              {...props}
              disabled={isDisabled}
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
