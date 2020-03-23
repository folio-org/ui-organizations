import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  Paneset,
} from '@folio/stripes/components';
import {
  CalloutContext,
} from '@folio/stripes/core';

import { ViewInterfaceContainer } from './ViewInterface/ViewInterfaceContainer';
import EditInterfaceContainer from './EditInterface';
import {
  ADD_INTERFACE_URL,
  EDIT_INTERFACE_URL,
  VIEW_INTERFACE_URL,
} from './constants';

class InterfaceContainer extends Component {
  static contextType = CalloutContext;
  static propTypes = {
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.connectedViewInterface = props.stripes.connect(ViewInterfaceContainer);
    this.connectedEditInterface = props.stripes.connect(EditInterfaceContainer);
  }

  showMessage = (messageKey, messageType = 'success') => {
    this.context.sendCallout({
      type: messageType,
      message: <FormattedMessage id={messageKey} />,
    });
  };

  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <Paneset isRoot>
        <Switch>
          <Route
            path={`${url}/:id/${VIEW_INTERFACE_URL}`}
            render={(props) => (
              <this.connectedViewInterface
                {...props}
                baseUrl={this.props.match.url}
                orgId={this.props.match.params.orgId}
                showMessage={this.showMessage}
              />
            )}
          />
          <Route
            path={`${url}/:id/${EDIT_INTERFACE_URL}`}
            render={(props) => (
              <this.connectedEditInterface
                {...props}
                orgId={this.props.match.params.orgId}
                showMessage={this.showMessage}
              />
            )}
          />
          <Route
            exact
            path={`${url}/${ADD_INTERFACE_URL}`}
            render={(props) => (
              <this.connectedEditInterface
                {...props}
                orgId={this.props.match.params.orgId}
                showMessage={this.showMessage}
              />
            )}
          />
        </Switch>
      </Paneset>
    );
  }
}

export default InterfaceContainer;
