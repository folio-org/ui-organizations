import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';
import { IfPermission, useStripes } from '@folio/stripes/core';

import css from './Credentials.css';

export const CredentialsContext = createContext();

export const Credentials = ({
  children,
  isKeyValue = false,
  perm,
}) => {
  const stripes = useStripes();
  const [isCredsVisible, setCredsVisible] = useState(false);

  const toggleCreds = () => setCredsVisible(prev => !prev);

  const hasPerm = stripes.hasPerm(perm);

  const renderToggle = ({
    label,
    ...btnProps
  } = {}) => (
    <IfPermission perm={perm}>
      <div className={css.toggle}>
        <Button
          onClick={toggleCreds}
          {...btnProps}
        >
          {label ?? <FormattedMessage id={`ui-organizations.edit.${isCredsVisible ? 'hideCredentials' : 'showCredentials'}`} />}
        </Button>
      </div>
    </IfPermission>
  );

  const contextValue = {
    hasPerm,
    isCredsVisible,
    isKeyValue,
    perm,
  };

  return (
    <CredentialsContext.Provider
      value={contextValue}
    >
      {children(renderToggle, hasPerm)}
    </CredentialsContext.Provider>
  );
};

Credentials.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  isKeyValue: PropTypes.bool,
  perm: PropTypes.string.isRequired,
};
