import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';

import {
  Col,
  Loading,
  Row,
} from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';
import { batchFetch } from '@folio/stripes-acq-components';

import { interfacesResource } from '../../../common/resources';
import OrganizationInterfacesList from './OrganizationInterfacesList';

function OrganizationInterfacesForm({ open, orgId, mutator, storedInterfaces }) {
  const [interfaces, setInterfaces] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const refreshInterfaces = useCallback(interfaceIds => {
    setIsLoading(true);
    batchFetch(mutator.interfacesManualFetch, interfaceIds || [])
      .then(setInterfaces)
      .catch(() => {
        setInterfaces([]);
      })
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => refreshInterfaces(storedInterfaces), [refreshInterfaces, storedInterfaces]);

  if (isLoading || !open) {
    return (
      <Loading />
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
          interfaces={interfacesMap}
          fetchInterfaces={refreshInterfaces}
          orgId={orgId}
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
  open: PropTypes.bool,
  orgId: PropTypes.string,
  storedInterfaces: PropTypes.arrayOf(PropTypes.string),
};

export default stripesConnect(OrganizationInterfacesForm);
