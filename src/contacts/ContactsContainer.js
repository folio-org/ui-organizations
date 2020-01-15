import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { FormattedMessage } from 'react-intl';

import {
  Callout,
  Paneset,
} from '@folio/stripes/components';

import ViewContact from './ViewContact';
import EditContact from './EditContact';

class ContactsContainer extends Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.callout = React.createRef();
  }

  onClose = (orgId, contactId) => {
    if (!contactId) {
      this.props.history.push(`/organizations/${orgId}/view`);
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
    this.callout.current.sendCallout({
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
        <Callout ref={this.callout} />
      </Paneset>
    );
  }
}

export default ContactsContainer;
