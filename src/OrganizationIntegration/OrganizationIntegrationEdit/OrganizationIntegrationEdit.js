import set from 'lodash/set';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import {
  LoadingPane,
  useIntegrationConfigs,
  useOrganization,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  useAcqMethods,
  useIntegrationConfig,
  useIntegrationConfigMutation,
} from '../../common/hooks';

import { findDefaultIntegration } from '../utils';
import { OrganizationIntegrationForm } from '../OrganizationIntegrationForm';

export const OrganizationIntegrationEdit = ({ orgId }) => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const sendCallout = useShowCallout();

  const { integrationConfig, isLoading } = useIntegrationConfig(id);
  const { organization, isLoading: isOrgLoading } = useOrganization(orgId);
  const { acqMethods, isLoading: isAcqMethodsLoading } = useAcqMethods();
  const { integrationConfigs, isFetching: isIntegrationsLoading } = useIntegrationConfigs({ organizationId: orgId });

  const initialValues = useMemo(() => {
    const config = structuredClone(integrationConfig);

    return set(config, 'exportTypeSpecificParameters.vendorEdiOrdersExportConfig.vendorName', organization?.name);
  }, [integrationConfig, organization?.name]);

  const closeForm = () => {
    history.push({
      pathname: `/organizations/${orgId}/integration/${id}/view`,
      search: location.search,
    });
  };

  const { mutateIntegrationConfig } = useIntegrationConfigMutation({
    onSuccess: () => {
      sendCallout({
        message: <FormattedMessage id="ui-organizations.integration.message.save.success" />,
      });
      closeForm();
    },
    onError: () => {
      sendCallout({
        message: <FormattedMessage id="ui-organizations.integration.message.save.error" />,
        type: 'error',
      });
    },
  });

  if (isLoading || isOrgLoading || isIntegrationsLoading || isAcqMethodsLoading) {
    return (
      <LoadingPane
        id="integration-create"
        onClose={closeForm}
      />
    );
  }

  return (
    <OrganizationIntegrationForm
      acqMethods={acqMethods}
      defaultIntegration={findDefaultIntegration(integrationConfigs, integrationConfig)}
      initialValues={initialValues}
      integrationConfigs={integrationConfigs}
      organization={organization}
      onSubmit={mutateIntegrationConfig}
      onClose={closeForm}
      paneTitle={
        <FormattedMessage
          id="ui-organizations.integration.edit.paneTitle"
          values={{ name: integrationConfig.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.configName }}
        />
      }
    />
  );
};

OrganizationIntegrationEdit.propTypes = {
  orgId: PropTypes.string,
};
