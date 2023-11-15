import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { stripesConnect } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import { VIEW_ORG_DETAILS } from '../../common/constants';
import { organizationsResource } from '../../common/resources';
import { BANKING_INFORMATION_FIELD_NAME } from '../constants';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';
import { OrganizationForm } from '../OrganizationForm';
import { useBankingInformationManager } from '../useBankingInformationManager';

const INITIAL_VALUES = {
  interfaces: [],
  contacts: [],
  isVendor: false,
  isDonor: false,
  edi: {
    vendorEdiType: '31B/US-SAN',
    libEdiType: '31B/US-SAN',
    ediFtp: {
      ftpFormat: 'SFTP',
      ftpMode: 'ASCII',
      ftpConnMode: 'Active',
    },
  },
};

export const OrganizationCreate = ({ history, location, mutator }) => {
  const { manageBankingInformation } = useBankingInformationManager();

  const cancelForm = useCallback(
    (id) => {
      history.push({
        pathname: id ? `${VIEW_ORG_DETAILS}${id}` : '/organizations',
        search: location.search,
        state: id ? { isDetailsPaneInFocus: true } : undefined,
      });
    },
    [history, location.search],
  );

  const showCallout = useShowCallout();
  const intl = useIntl();

  const createOrganization = useCallback(
    (values, { getFieldState }) => {
      const { [BANKING_INFORMATION_FIELD_NAME]: bankingInformation, ...data } = values;

      return mutator.createOrganizationOrg.POST(data)
        .then(async organization => {
          await manageBankingInformation({
            initBankingInformation: getFieldState(BANKING_INFORMATION_FIELD_NAME)?.initial,
            bankingInformation,
            organization,
          });

          return organization;
        })
        .then(organization => {
          setTimeout(() => cancelForm(organization.id));
          showCallout({
            messageId: 'ui-organizations.save.success',
            values: { organizationName: organization.name },
          });
        })
        .catch(async e => {
          await handleSaveErrorResponse(intl, showCallout, e);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelForm, intl, manageBankingInformation, showCallout],
  );

  const initialValues = useMemo(() => ({
    [BANKING_INFORMATION_FIELD_NAME]: [],
    ...INITIAL_VALUES,
  }), []);

  return (
    <OrganizationForm
      initialValues={initialValues}
      onSubmit={createOrganization}
      cancelForm={cancelForm}
    />
  );
};

OrganizationCreate.manifest = Object.freeze({
  createOrganizationOrg: organizationsResource,
});

OrganizationCreate.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(OrganizationCreate));
