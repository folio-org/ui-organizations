import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';

import { viewVendorCredsResource } from '../../../../common/resources';

import OrganizationInterface from './OrganizationInterface';

const InterfaceViewContainer = ({ mutator: { viewVendorCreds }, ...rest }) => {
  const getCreds = () => viewVendorCreds.GET()
    .catch(() => ({}));

  return (
    <OrganizationInterface
      getCreds={getCreds}
      {...rest}
    />
  );
};

InterfaceViewContainer.manifest = Object.freeze({
  viewVendorCreds: viewVendorCredsResource,
});

InterfaceViewContainer.propTypes = {
  item: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
  isNarrow: PropTypes.bool,
};

export default stripesConnect(InterfaceViewContainer);
