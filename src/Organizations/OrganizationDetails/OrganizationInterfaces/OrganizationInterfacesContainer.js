import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { batchFetch } from '@folio/stripes-acq-components';

import {
  interfacesResource,
} from '../../../common/resources';

import OrganizationInterfaces from './OrganizationInterfaces';

const OrganizationInterfacesContainer = ({ mutator, interfaceIds }) => {
  const [interfaces, setInterfaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      setIsLoading(true);
      batchFetch(mutator.organizationDetailsInfaces, interfaceIds)
        .then(setInterfaces)
        .catch(() => {
          setInterfaces([]);
        })
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interfaceIds],
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <OrganizationInterfaces
      interfaces={interfaces}
    />
  );
};

OrganizationInterfacesContainer.manifest = Object.freeze({
  organizationDetailsInfaces: {
    ...interfacesResource,
    accumulate: true,
    fetch: false,
  },
});

OrganizationInterfacesContainer.propTypes = {
  interfaceIds: PropTypes.arrayOf(PropTypes.string),
  mutator: PropTypes.object.isRequired,
};

export default stripesConnect(OrganizationInterfacesContainer);
