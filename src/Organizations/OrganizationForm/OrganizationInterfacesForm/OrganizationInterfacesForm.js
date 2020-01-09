import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import {
  Col,
  Icon,
  Row,
} from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';
import { batchFetch } from '@folio/stripes-acq-components';

import { interfacesResource } from '../../../common/resources';
import OrganizationInterfacesList from './OrganizationInterfacesList';

function OrganizationInterfacesForm({ orgId, mutator, storedInterfaces }) {
  const [interfaces, setInterfaces] = useState();
  const refreshInterfaces = useCallback(interfaceIds => {
    batchFetch(mutator.interfacesManualFetch, interfaceIds || [])
      .then(setInterfaces);
  }, []);

  useEffect(() => refreshInterfaces(storedInterfaces), [refreshInterfaces, storedInterfaces]);

  const isLoading = !interfaces;

  if (isLoading) {
    return (
      <Icon
        icon="spinner-ellipsis"
        width="100px"
      />
    );
  }

  const interfacesMap = interfaces.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});

  return (
    <Row>
      <Col xs={12}>
        <FieldArray
          name="interfaces"
          component={OrganizationInterfacesList}
          props={{
            interfaces: interfacesMap,
            fetchInterfaces: refreshInterfaces,
            orgId,
          }}
        />
      </Col>
    </Row>
  );
}

OrganizationInterfacesForm.manifest = Object.freeze({
  interfacesManualFetch: {
    ...interfacesResource,
    fetch: false,
    accumulate: true,
  },
});

OrganizationInterfacesForm.propTypes = {
  mutator: PropTypes.object.isRequired,
  orgId: PropTypes.string,
  storedInterfaces: PropTypes.arrayOf(PropTypes.string),
};

OrganizationInterfacesForm.defaultProps = {
  storedInterfaces: [],
};

export default stripesConnect(OrganizationInterfacesForm);
