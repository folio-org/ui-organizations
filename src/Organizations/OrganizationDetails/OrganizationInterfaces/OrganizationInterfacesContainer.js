import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import { Icon } from '@folio/stripes/components';

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
      setInterfaces([]);

      const interfacesPromise = interfaceIds.length === 0
        ? Promise.resolve([])
        : mutator.organizationDetailsInfaces.GET({
          params: {
            query: interfaceIds.map(interfaceId => `id==${interfaceId}`).join(' or '),
          },
        });

      interfacesPromise
        .then(interfacesResponse => setInterfaces(interfacesResponse))
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interfaceIds],
  );

  if (isLoading) {
    return <Icon icon="spinner-ellipsis" />;
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
  },
});

OrganizationInterfacesContainer.propTypes = {
  interfaceIds: PropTypes.arrayOf(PropTypes.string),
  mutator: PropTypes.object.isRequired,
};

OrganizationInterfacesContainer.defaultProps = {
  interfaceIds: [],
};

export default stripesConnect(OrganizationInterfacesContainer);
