import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEqual, get } from 'lodash';
import { FieldArray, getFormValues } from 'redux-form';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import InterfacesList from './InterfacesList';
import { updateInterfaces } from './utils';

class InterfacesListContainer extends Component {
  static propTypes = {
    parentMutator: PropTypes.object,
    parentResources: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    orgId: PropTypes.string,
    initialValues: PropTypes.object,
  };

  componentDidMount() {
    const { parentMutator, parentResources } = this.props;
    const interfaces = get(parentResources, 'vendorID.records[0].interfaces', []);

    updateInterfaces(interfaces, parentMutator);
  }

  componentDidUpdate(prevProps) {
    const { parentMutator, stripes: { store }, initialValues } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const storedInterfaces = get(initialValues, 'interfaces', []);
    const currentInterfaces = get(formValues, 'interfaces', []);

    if (!isEqual(storedInterfaces, currentInterfaces) && currentInterfaces.length) {
      updateInterfaces(currentInterfaces, parentMutator);
    }
  }


  render() {
    const { orgId, parentResources, stripes } = this.props;
    const interfaces = get(parentResources, 'interfaces.records', []).reduce((acc, item) => {
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
              orgId,
              stripes,
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default InterfacesListContainer;
