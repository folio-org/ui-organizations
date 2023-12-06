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
import { PRIVILEGED_CONTACT_URL_PATH } from './constants';
import EditContact from './EditContact';
import ViewContact from './ViewContact';

function ContactsContainer({ history, match: { params, url } }) {
  const sendCallout = useShowCallout();
  const contactsUrlPath = url.includes(PRIVILEGED_CONTACT_URL_PATH) ? PRIVILEGED_CONTACT_URL_PATH : 'contacts';
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
      history.push(`/organizations/${orgId}/${contactsUrlPath}/details/${contactId}/view`);
    }
  }, [contactsUrlPath, history]);

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
