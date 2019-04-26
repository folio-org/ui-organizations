import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Icon } from '@folio/stripes/components';

import { contactResource, categoriesResource } from '../../common/resources';
import ViewContact from './ViewContact';

class ViewContactContainer extends Component {
  static propTypes = {
    history: PropTypes.object,
    resources: PropTypes.object,
    baseUrl: PropTypes.string.isRequired,
  };

  static manifest = Object.freeze({
    contact: contactResource,
    categories: categoriesResource,
  });

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { resources, baseUrl } = this.props;

    const contact = get(resources, 'contact.records[0]', {});
    const categories = get(resources, 'categories.records', []);

    if (get(resources, 'contact.isPending', true)) {
      return <Icon icon="spinner-ellipsis" />;
    }

    return (
      <ViewContact
        categories={categories}
        onClose={this.onClose}
        contact={contact}
        baseUrl={baseUrl}
      />
    );
  }
}

export default ViewContactContainer;
