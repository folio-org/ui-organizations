import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import {
  Paneset,
} from '@folio/stripes/components';

import ContactsView from './ContactsView';
import ContactsEditContainer from './ContactsEditContainer';

class ContactsContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.connectedContactsView = props.stripes.connect(ContactsView);
    this.connectedContactsEditContainer = props.stripes.connect(ContactsEditContainer);
  }

  onCancel = () => this.props.history.goBack();

  onSubmit = () => {
    this.props.history.goBack();
  }

  goToEdit = (props) => (
    <this.connectedContactsEditContainer
      {...props}
      onClose={this.onCancel}
      onSubmit={this.onSubmit}
      stripes={this.props.stripes}
    />
  );

  goToView = (props) => (
    <this.connectedContactsView
      {...props}
      onClose={this.onCancel}
      onSubmit={this.onSubmit}
      stripes={this.props.stripes}
      baseUrl={this.props.match.url}
    />
  );

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
            path={`${url}/:id/edit`}
            render={this.goToEdit}
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
