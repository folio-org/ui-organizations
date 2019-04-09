import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
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
  }

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.path}`}
            render={() => <this.connectedApp {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Organizations;
