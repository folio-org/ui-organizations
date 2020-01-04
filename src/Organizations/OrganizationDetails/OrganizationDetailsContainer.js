import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { stripesConnect } from '@folio/stripes/core';
import {
  LoadingPane,
} from '@folio/stripes-acq-components';

import {
  organizationResourceByUrl,
  categoriesResource,
} from '../../common/resources';

import OrganizationDetails from './OrganizationDetails';

const OrganizationDetailsContainer = ({
  history,
  location,
  match,
  mutator,
}) => {
  const organizationId = match.params.id;

  const [organization, setOrganization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [organizationCategories, setOrganizationCategories] = useState([]);

  useEffect(
    () => {
      mutator.organizationDetailsCategories.GET()
        .then(organizationCategoriesResponse => {
          setOrganizationCategories(organizationCategoriesResponse);
        });
    },
    [],
  );

  useEffect(
    () => {
      setIsLoading(true);
      setOrganization({});

      mutator.organizationDetailsOrg.GET()
        .then(organizationResponse => {
          setOrganization(organizationResponse);
        })
        .finally(() => setIsLoading(false));
    },
    [organizationId],
  );

  const onClose = useCallback(
    () => {
      history.push({
        pathname: '/organizations/new_view',
        search: location.search,
      });
    },
    [location.search],
  );

  if (isLoading) {
    return <LoadingPane onClose={onClose} />;
  }

  return (
    <OrganizationDetails
      onClose={onClose}
      organization={organization}
      organizationCategories={organizationCategories}
    />
  );
};

OrganizationDetailsContainer.manifest = Object.freeze({
  organizationDetailsOrg: {
    ...organizationResourceByUrl,
    accumulate: true,
  },
  organizationDetailsCategories: {
    ...categoriesResource,
    accumulate: true,
  },
});

OrganizationDetailsContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(OrganizationDetailsContainer));
