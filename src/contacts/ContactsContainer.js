import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { FormattedMessage } from 'react-intl';

import {
  Paneset,
} from '@folio/stripes/components';
import {
  CalloutContext,
} from '@folio/stripes/core';

import { VIEW_ORG_DETAILS } from '../common/constants';
import ViewContact from './ViewContact';
import EditContact from './EditContact';

class ContactsContainer extends Component {
  static contextType = CalloutContext;
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  };

  onClose = (orgId, contactId) => {
    if (!contactId) {
      this.props.history.push(`${VIEW_ORG_DETAILS}${orgId}`);
    } else {
      this.props.history.push(`/organizations/${orgId}/contacts/details/${contactId}/view`);
    }
  };

  goToEdit = (props) => (
    <EditContact
      {...props}
      orgId={this.props.match.params.orgId}
      showMessage={this.showMessage}
    />
  );

  goToView = (props) => (
    <ViewContact
      {...props}
      orgId={this.props.match.params.orgId}
      showMessage={this.showMessage}
      baseUrl={this.props.match.url}
    />
  );

  showMessage = (messageKey, messageType = 'success') => {
    this.context.sendCallout({
      type: messageType,
      message: <FormattedMessage id={messageKey} />,
    });
  }

  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <Paneset isRoot>
        <Switch>
          <Route
            path={`${url}/:id/view`}
            render={this.goToView}
          />
          <Route
            path={`${url}/details/:id/view`}
            render={(props) => (
              <ViewContact
                {...props}
                orgId={this.props.match.params.orgId}
                showMessage={this.showMessage}
                baseUrl={`${this.props.match.url}/details`}
                onClose={this.onClose}
              />
            )}
          />
          <Route
            path={`${url}/:id/edit`}
            render={this.goToEdit}
          />
          <Route
            path={`${url}/details/:id/edit`}
            render={(props) => (
              <EditContact
                {...props}
                orgId={this.props.match.params.orgId}
                showMessage={this.showMessage}
                onClose={this.onClose}
              />
            )}
          />
          <Route
            path={`${url}/add-contact`}
            render={this.goToEdit}
          />
        </Switch>
      </Paneset>
    );
  }
}

export default ContactsContainer;
