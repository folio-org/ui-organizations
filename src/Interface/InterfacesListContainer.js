import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import { FieldArray } from 'redux-form';

import {
  Col,
  Icon,
  Row,
} from '@folio/stripes/components';

import InterfacesList from './InterfacesList';
import { mutatorGet } from '../common/utils';

class InterfacesListContainer extends Component {
  static propTypes = {
    parentMutator: PropTypes.object,
    parentResources: PropTypes.object,
    orgId: PropTypes.string,
    storedInterfaces: PropTypes.arrayOf(PropTypes.object),
  };

  componentDidMount() {
    const { storedInterfaces } = this.props;

    this.refreshInterfaces(storedInterfaces);
  }

  refreshInterfaces = (interfaceIds = []) => {
    const { parentMutator } = this.props;

    mutatorGet(parentMutator.interfacesManualFetch, interfaceIds);
  }

  render() {
    const { orgId, parentResources } = this.props;
    const interfaces = get(parentResources, 'interfacesManualFetch.records', []).reduce((acc, item) => {
      acc[item.id] = item;

      return acc;
    }, {});
    const isLoading = !get(parentResources, 'interfacesManualFetch.hasLoaded');

    if (isLoading) {
      return (
        <div>
          <Icon
            icon="spinner-ellipsis"
            width="100px"
          />
        </div>
      );
    }

    return (
      <Row>
        <Col xs={12}>
          <FieldArray
            name="interfaces"
            component={InterfacesList}
            props={{
              interfaces,
              fetchInterfaces: this.refreshInterfaces,
              orgId,
            }}
          />
        </Col>
      </Row>
    );
  }
}

InterfacesListContainer.defaultProps = {
  storedInterfaces: [],
};

export default InterfacesListContainer;
