import React, { useCallback } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
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

import { VIEW_ORG_DETAILS } from '../common/constants';
import ViewContact from './ViewContact';
import EditContact from './EditContact';

function ContactsContainer({ history, match: { params, url } }) {
  const sendCallout = useShowCallout();
  const showMessage = useCallback((messageKey, messageType = 'success') => {
    sendCallout({
      type: messageType,
      message: <FormattedMessage id={messageKey} />,
    });
  }, [sendCallout]);

  const onClose = useCallback((orgId, contactId) => {
    if (!contactId) {
      history.push(`${VIEW_ORG_DETAILS}${orgId}`);
    } else {
      history.push(`/organizations/${orgId}/contacts/details/${contactId}/view`);
    }
  }, [history]);

  const goToEdit = useCallback((props) => (
    <EditContact
      {...props}
      orgId={params.orgId}
      showMessage={showMessage}
    />
  ), [params.orgId, showMessage]);

  const goToView = useCallback((props) => (
    <ViewContact
      {...props}
      orgId={params.orgId}
      showMessage={showMessage}
      baseUrl={url}
    />
  ), [params.orgId, showMessage, url]);

  return (
    <CommandList commands={defaultKeyboardShortcuts}>
      <Paneset isRoot>
        <Switch>
          <Route
            path={`${url}/:id/view`}
            render={goToView}
          />
          <Route
            path={`${url}/details/:id/view`}
            render={(props) => (
              <ViewContact
                {...props}
                orgId={params.orgId}
                showMessage={showMessage}
                baseUrl={`${url}/details`}
                onClose={onClose}
              />
            )}
          />
          <Route
            path={`${url}/:id/edit`}
            render={goToEdit}
          />
          <Route
            path={`${url}/details/:id/edit`}
            render={(props) => (
              <EditContact
                {...props}
                orgId={params.orgId}
                showMessage={showMessage}
                onClose={onClose}
              />
            )}
          />
          <Route
            path={`${url}/add-contact`}
            render={goToEdit}
          />
        </Switch>
      </Paneset>
    </CommandList>
  );
}

ContactsContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default ContactsContainer;
