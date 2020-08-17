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
  useShowCallout,
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
  refreshList,
}) => {
  const organizationId = match.params.id;

  const showCallout = useShowCallout();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organizationId],
  );

  const closePane = useCallback(
    () => {
      history.push({
        pathname: '/organizations',
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const editOrganization = useCallback(
    () => {
      history.push({
        pathname: `/organizations/${organizationId}/edit`,
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organizationId, location.search],
  );

  const deleteOrganization = useCallback(
    () => {
      mutator.organizationDetailsOrg.DELETE({ id: organization.id }, { silent: true }).then(() => {
        showCallout({
          messageId: 'ui-organizations.organization.delete.success',
          type: 'success',
          values: { organizationName: organization.name },
        });
        refreshList();
        history.replace({
          pathname: '/organizations',
          search: location.search,
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organization.id, organization.name, showCallout, history, location.search],
  );

  const updateOrganization = useCallback(
    (data) => {
      mutator.organizationDetailsOrg.PUT(data)
        .then(() => mutator.organizationDetailsOrg.GET())
        .then(setOrganization);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (isLoading) {
    return <LoadingPane onClose={closePane} />;
  }

  return (
    <OrganizationDetails
      onClose={closePane}
      onEdit={editOrganization}
      onDelete={deleteOrganization}
      onUpdate={updateOrganization}
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
  refreshList: PropTypes.func.isRequired,
};

export default withRouter(stripesConnect(OrganizationDetailsContainer));
