import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import {
  Paneset,
} from '@folio/stripes/components';

import ViewContact from './ViewContact';
import EditContactContainer from './EditContact';

class ContactsContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.connectedViewContact = props.stripes.connect(ViewContact);
    this.connectedEditContactContainer = props.stripes.connect(EditContactContainer);
  }

  onCancel = () => this.props.history.goBack();

  onSubmit = () => {
    this.props.history.goBack();
  }

  goToEdit = (props) => (
    <this.connectedEditContactContainer
      {...props}
      onClose={this.onCancel}
      onSubmit={this.onSubmit}
      stripes={this.props.stripes}
    />
  );

  goToView = (props) => (
    <this.connectedViewContact
      {...props}
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
