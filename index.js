import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { hot } from 'react-hot-loader';

import { ContactsContainer } from './src/contacts';
import InterfaceContainer from './src/interfaces';
import Main from './src/Main';
import Settings from './src/Settings';

class Organizations extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);
    this.connectedApp = props.stripes.connect(Main);
    this.connectedContactsContainer = props.stripes.connect(ContactsContainer);
    this.connectedInterfaceContainer = props.stripes.connect(InterfaceContainer);
  }

  goToContacts = (props) => (
    <this.connectedContactsContainer
      {...props}
      stripes={this.props.stripes}
    />
  );

  goToInterface = (props) => (
    <this.connectedInterfaceContainer
      {...props}
      stripes={this.props.stripes}
    />
  );

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }

    return (
      <div>
        <Switch>
          <Route
            path="/organizations/contacts/"
            render={this.goToContacts}
          />
          <Route
            path="/organizations/interface/"
            render={this.goToInterface}
          />
          <Route
            path="/organizations/:orgId/contacts/"
            render={this.goToContacts}
          />
          <Route
            path="/organizations/:orgId/interface/"
            render={this.goToInterface}
          />
          <Route
            path={`${this.props.match.path}`}
            render={() => <this.connectedApp {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(Organizations);
