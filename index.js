import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { Organizations as Organization } from './src/Organizations';
import { ContactsContainer } from './src/contacts';
import { InterfaceContainer } from './src/interfaces';
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

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }

    return (
      <Switch>
        <Route
          component={ContactsContainer}
          path="/organizations/contacts/"
        />
        <Route
          component={InterfaceContainer}
          path="/organizations/interface/"
        />
        <Route
          component={ContactsContainer}
          path="/organizations/:orgId/contacts/"
        />
        <Route
          component={InterfaceContainer}
          path="/organizations/:orgId/interface/"
        />
        <Route
          path="/organizations"
          component={Organization}
        />
      </Switch>
    );
  }
}

export default hot(module)(Organizations);
