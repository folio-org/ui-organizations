import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';
import {
  batchFetch,
  LoadingPane,
  useIntegrationConfigs,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  organizationResourceByUrl,
  categoriesResource,
  typesResource,
} from '../../common/resources';
import {
  useTranslatedCategories,
} from '../../common/hooks';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';
import OrganizationDetails from './OrganizationDetails';

export const OrganizationDetailsContainer = ({
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
  const [translatedCategories] = useTranslatedCategories(organizationCategories);
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const intl = useIntl();

  const { integrationConfigs } = useIntegrationConfigs({ organizationId });

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
      let _organization;

      mutator.organizationDetailsOrg.GET()
        .then(organizationResponse => {
          _organization = organizationResponse;
          setOrganization(organizationResponse);
        })
        .finally(() => {
          fetchOrganizationTypes(_organization);
          setIsLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organizationId],
  );

  const fetchOrganizationTypes = (organization) => {
    const typeIds = organization.organizationTypes;

    batchFetch(mutator.organizationTypes, typeIds)
      .then(setOrganizationTypes)
      .catch(() => {
        setOrganizationTypes([]);
      });
  };

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

  const viewExportLog = useCallback(
    () => {
      history.push({
        pathname: '/export-manager/edi-jobs',
        search: `vendorId=${organizationId}`,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organizationId],
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
        .then(setOrganization)
        .catch((e) => handleSaveErrorResponse(intl, showCallout, e));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intl, showCallout, organizationId],
  );

  if (isLoading) {
    return (
      <LoadingPane
        id="pane-organization-details"
        onClose={closePane}
      />
    );
  }

  return (
    <OrganizationDetails
      onClose={closePane}
      onEdit={editOrganization}
      onDelete={deleteOrganization}
      onViewExportLog={viewExportLog}
      onUpdate={updateOrganization}
      organization={organization}
      organizationCategories={translatedCategories}
      integrationConfigs={integrationConfigs}
      organizationTypes={organizationTypes}
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
  organizationTypes: {
    ...typesResource,
    accumulate: true,
  },
});

OrganizationDetailsContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  mutator: PropTypes.object.isRequired,
  refreshList: PropTypes.func.isRequired,
  resources: PropTypes.shape({
    organizationTypes: PropTypes.object,
  }).isRequired,
};

export default withRouter(stripesConnect(OrganizationDetailsContainer));
