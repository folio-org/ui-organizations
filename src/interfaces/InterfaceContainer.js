import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
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

  goToEdit = (props) => (
    <this.connectedEditInterface
      {...props}
      orgId={this.props.match.params.orgId}
      showMessage={this.showMessage}
      stripes={this.props.stripes}
    />
  );

  goToView = (props) => (
    <this.connectedViewInterface
      {...props}
      baseUrl={this.props.match.url}
      orgId={this.props.match.params.orgId}
      showMessage={this.showMessage}
      stripes={this.props.stripes}
    />
  );

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
            render={this.goToView}
          />
          <Route
            path={`${url}/:id/${EDIT_INTERFACE_URL}`}
            render={this.goToEdit}
          />
          <Route
            path={`${url}/${ADD_INTERFACE_URL}`}
            render={this.goToEdit}
          />
        </Switch>
      </Paneset>
    );
  }
}

export default InterfaceContainer;
