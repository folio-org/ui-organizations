import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import { FieldArray } from 'redux-form';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import InterfacesList from './InterfacesList';
import { fetchInterfaces } from './utils';

class InterfacesListContainer extends Component {
  static propTypes = {
    parentMutator: PropTypes.object,
    parentResources: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    orgId: PropTypes.string,
    storedInterfaces: PropTypes.arrayOf(PropTypes.object),
  };

  componentDidMount() {
    const { storedInterfaces } = this.props;

    this.refreshInterfaces(storedInterfaces);
  }

  refreshInterfaces = (interfaceIds = []) => {
    const { parentMutator } = this.props;
    fetchInterfaces(interfaceIds, parentMutator.interfacesManualFetch);
  }

  render() {
    const { orgId, parentResources, stripes } = this.props;
    const interfaces = get(parentResources, 'interfacesManualFetch.records', []).reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

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
              stripes,
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
