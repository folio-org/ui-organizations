import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  get,
  noop,
} from 'lodash';

import { Icon } from '@folio/stripes/components';

import ViewInterface from './ViewInterface';
import { interfaceResource } from '../../common/resources';

export class ViewInterfaceContainer extends Component {
  static propTypes = {
    resources: PropTypes.object,
    baseUrl: PropTypes.string.isRequired,
    orgId: PropTypes.string,
    mutator: PropTypes.object,
  };

  static manifest = Object.freeze({
    interface: interfaceResource,
    query: {}
  });

  onClose = () => {
    const { orgId, mutator } = this.props;
    mutator.query.replace({
      _path: orgId ? `/organizations/view/${orgId}` : '/organizations',
      layer: orgId ? 'edit' : 'create',
    });
  };

  render() {
    const { resources, baseUrl } = this.props;

    const currentInterface = get(resources, 'interface.records[0]', {});

    if (get(resources, 'interface.isPending', true)) {
      return <Icon icon="spinner-ellipsis" />;
    }

    return (
      <ViewInterface
        baseUrl={baseUrl}
        item={currentInterface}
        deleteInterface={noop}
        onClose={this.onClose}
        unassign={noop}
      />
    );
  }
}

export default ViewInterfaceContainer;
