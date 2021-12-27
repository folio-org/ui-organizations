import PropTypes from 'prop-types';

import {
  LoadingPane,
} from '@folio/stripes-acq-components';

import {
  useAcqMethods,
  useOrganization,
  useIntegrationConfigs,
} from '../../common/hooks';

import {
  EDI_CODE_TYPES,
  FTP_TYPES,
  TRANSMISSION_MODES,
  CONNECTION_MODES,
} from '../constants';
import { buildAvailableAccounts } from '../utils';
import { OrganizationIntegrationForm } from '../OrganizationIntegrationForm';

export const OrganizationIntegrationCreate = ({ orgId }) => {
  const initialValues = {
    schedulePeriod: 'NONE',
    exportTypeSpecificParameters: {
      vendorEdiOrdersExportConfig: {
        vendorId: orgId,
        ediConfig: {
          vendorEdiCode: EDI_CODE_TYPES[0].value,
          libEdiCode: EDI_CODE_TYPES[0].value,
        },
        editFtp: {
          ftpFormat: FTP_TYPES[0].value,
          ftpMode: TRANSMISSION_MODES[0].value,
          ftpConnMode: CONNECTION_MODES[0].value,
        },
      },
    },
  };

  const { organization, isLoading } = useOrganization(orgId);
  const { acqMethods, isLoading: isAcqMethodsLoading } = useAcqMethods();
  const { integrationConfigs, isLoading: isIntegrationsLoading } = useIntegrationConfigs({ organizationId: orgId });

  if (isLoading || isIntegrationsLoading || isAcqMethodsLoading) {
    return (
      <LoadingPane
        id="integration-create"
        onClose={() => console.log('close')}
      />
    );
  }

  return (
    <OrganizationIntegrationForm
      acqMethods={acqMethods}
      accounts={buildAvailableAccounts(organization, integrationConfigs)}
      organization={organization}
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
    />
  );
};

OrganizationIntegrationCreate.propTypes = {
  orgId: PropTypes.string,
};
