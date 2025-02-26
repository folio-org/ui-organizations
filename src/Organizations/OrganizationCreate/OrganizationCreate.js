import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { useShowCallout } from '@folio/stripes-acq-components';

import {
  ORGANIZATIONS_ROUTE,
  VIEW_ORG_DETAILS,
} from '../../common/constants';
import { useOrganizationMutation } from '../../common/hooks';
import {
  BANKING_INFORMATION_FIELD_NAME,
  SUBMIT_ACTION,
  SUBMIT_ACTION_FIELD_NAME,
} from '../constants';
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

export const OrganizationCreate = ({ history, location }) => {
  const { manageBankingInformation } = useBankingInformationManager();

  const {
    createOrganization,
    isLoading: isCreateOrganizationLoading,
  } = useOrganizationMutation();

  const saveAndKeepEditingHandler = useCallback((id) => {
    history.push({
      pathname: `${ORGANIZATIONS_ROUTE}/${id}/edit`,
      search: location.search,
    });
  }, [history, location.search]);

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

  const onSubmit = useCallback((
    { [SUBMIT_ACTION_FIELD_NAME]: submitAction, ...values },
    { getFieldState },
  ) => {
    const { [BANKING_INFORMATION_FIELD_NAME]: bankingInformation, ...data } = values;

    return createOrganization({ data })
      .then(async (organization) => {
        await manageBankingInformation({
          initBankingInformation: getFieldState(BANKING_INFORMATION_FIELD_NAME)?.initial,
          bankingInformation,
          organization,
        });

        return organization;
      })
      .then((organization) => {
        showCallout({
          messageId: 'ui-organizations.save.success',
          values: { organizationName: organization.name },
        });

        switch (submitAction) {
          case SUBMIT_ACTION.saveAndKeepEditing:
            saveAndKeepEditingHandler(organization.id);
            break;
          case SUBMIT_ACTION.saveAndClose:
          default:
            cancelForm(organization.id);
            break;
        }
      })
      .catch(async (e) => {
        await handleSaveErrorResponse(intl, showCallout, e?.response);
      });
  }, [cancelForm, createOrganization, intl, manageBankingInformation, saveAndKeepEditingHandler, showCallout]);

  const initialValues = useMemo(() => ({
    [BANKING_INFORMATION_FIELD_NAME]: [],
    ...INITIAL_VALUES,
  }), []);

  return (
    <OrganizationForm
      initialValues={initialValues}
      isSubmitDisabled={isCreateOrganizationLoading}
      onSubmit={onSubmit}
      cancelForm={cancelForm}
    />
  );
};

OrganizationCreate.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(OrganizationCreate);
