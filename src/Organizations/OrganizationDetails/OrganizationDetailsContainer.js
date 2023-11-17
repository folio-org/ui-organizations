import PropTypes from 'prop-types';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesConnect } from '@folio/stripes/core';
import {
  LoadingPane,
  useIntegrationConfigs,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  useBankingInformationSettings,
  useTranslatedCategories,
  useTypes,
} from '../../common/hooks';
import {
  organizationResourceByUrl,
  categoriesResource,
} from '../../common/resources';
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

  const intl = useIntl();
  const showCallout = useShowCallout();

  const [organization, setOrganization] = useState({});
  const [isOrganizationLoading, setIsOrganizationLoading] = useState(true);
  const [organizationCategories, setOrganizationCategories] = useState([]);
  const [translatedCategories] = useTranslatedCategories(organizationCategories);
  const { organizationTypes, isLoading: isOrgTypesLoading } = useTypes();
  const { integrationConfigs } = useIntegrationConfigs({ organizationId });
  const {
    enabled: isBankingInformationEnabled,
    isLoading: isBankingInformationSettingsLoading,
  } = useBankingInformationSettings();

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
      setIsOrganizationLoading(true);
      setOrganization({});

      mutator.organizationDetailsOrg.GET()
        .then(organizationResponse => {
          setOrganization(organizationResponse);
        })
        .finally(() => setIsOrganizationLoading(false));
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

  const isLoading = (
    isOrganizationLoading
    || isOrgTypesLoading
    || isBankingInformationSettingsLoading
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
      isBankingInformationEnabled={isBankingInformationEnabled}
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
});

OrganizationDetailsContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  mutator: PropTypes.object.isRequired,
  refreshList: PropTypes.func.isRequired,
};

export default withRouter(stripesConnect(OrganizationDetailsContainer));
