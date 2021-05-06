import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  CommandList,
  defaultKeyboardShortcuts,
  Paneset,
} from '@folio/stripes/components';
import {
  useShowCallout,
} from '@folio/stripes-acq-components';

import ViewInterfaceContainer from './ViewInterface/ViewInterfaceContainer';
import EditInterfaceContainer from './EditInterface';
import {
  ADD_INTERFACE_URL,
  EDIT_INTERFACE_URL,
  VIEW_INTERFACE_URL,
} from './constants';

function InterfaceContainer({ match: { params, url } }) {
  const sendCallout = useShowCallout();
  const showMessage = useCallback((messageKey, messageType = 'success') => {
    sendCallout({
      type: messageType,
      message: <FormattedMessage id={messageKey} />,
    });
  }, [sendCallout]);

  return (
    <CommandList commands={defaultKeyboardShortcuts}>
      <Paneset isRoot>
        <Switch>
          <Route
            path={`${url}/:id/${VIEW_INTERFACE_URL}`}
            render={(props) => (
              <ViewInterfaceContainer
                {...props}
                baseUrl={url}
                orgId={params.orgId}
                showMessage={showMessage}
              />
            )}
          />
          <Route
            path={`${url}/:id/${EDIT_INTERFACE_URL}`}
            render={(props) => (
              <EditInterfaceContainer
                {...props}
                orgId={params.orgId}
              />
            )}
          />
          <Route
            exact
            path={`${url}/${ADD_INTERFACE_URL}`}
            render={(props) => (
              <EditInterfaceContainer
                {...props}
                orgId={params.orgId}
              />
            )}
          />
        </Switch>
      </Paneset>
    </CommandList>
  );
}

InterfaceContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default InterfaceContainer;
