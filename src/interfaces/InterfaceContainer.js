import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { FormattedMessage } from 'react-intl';

import {
  Callout,
  Paneset,
} from '@folio/stripes/components';

import { ViewInterfaceContainer } from './ViewInterface/ViewInterfaceContainer';
import {
  ADD_INTERFACE_URL,
  EDIT_INTERFACE_URL,
  VIEW_INTERFACE_URL
} from './constants';

export class InterfaceContainer extends Component { // eslint-disable-line import/prefer-default-export
  static propTypes = {
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.connectedViewInterface = props.stripes.connect(ViewInterfaceContainer);
    this.connectedEditInterface = null; // it needs to connect appropriate component
    this.callout = React.createRef();
  }

  goToEdit = (props) => (
    <this.connectedEditInterface
      {...props}
      showMessage={this.showMessage}
      stripes={this.props.stripes}
    />
  );

  goToView = (props) => (
    <this.connectedViewInterface
      {...props}
      orgId={this.props.match.params.orgId}
      showMessage={this.showMessage}
      stripes={this.props.stripes}
      baseUrl={this.props.match.url}
    />
  );

  showMessage = (messageKey, messageType = 'success') => {
    this.callout.current.sendCallout({
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
        <Callout ref={this.callout} />
      </Paneset>
    );
  }
}
