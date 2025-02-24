import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  Paneset,
} from '@folio/stripes/components';
import {
  LoadingPane,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  ORGANIZATIONS_ROUTE,
  VIEW_ORG_DETAILS,
} from '../../common/constants';
import { useOrganizationBankingInformation } from '../../common/hooks';
import { organizationResourceByUrl } from '../../common/resources';
import {
  BANKING_INFORMATION_FIELD_NAME,
  SUBMIT_ACTION,
  SUBMIT_ACTION_FIELD_NAME,
} from '../constants';
import { OrganizationForm } from '../OrganizationForm';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';
import { useBankingInformationManager } from '../useBankingInformationManager';

export const OrganizationEdit = ({ match, history, location, mutator }) => {
  const organizationId = match.params.id;

  const [organization, setOrganization] = useState({});
  const [isOrganizationLoading, setIsOrganizationLoading] = useState(true);
  const showCallout = useShowCallout();
  const intl = useIntl();

  const { manageBankingInformation } = useBankingInformationManager();

  const {
    bankingInformation: bankingInformationData,
    isLoading: isBankingInformationLoading,
  } = useOrganizationBankingInformation(organizationId);

  const fetchOrganization = useCallback(() => {
    setIsOrganizationLoading(true);

    return mutator.editOrganizationOrg.GET()
      .then(organizationsResponse => {
        setOrganization(organizationsResponse);
      })
      .finally(() => setIsOrganizationLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveAndKeepEditingHandler = useCallback(() => {
    fetchOrganization();

    history.push({
      pathname: `${ORGANIZATIONS_ROUTE}/${organizationId}/edit`,
      search: location.search,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOrganization, location.search, organizationId]);

  const cancelForm = useCallback(
    () => {
      history.push({
        pathname: `${VIEW_ORG_DETAILS}${organizationId}`,
        search: location.search,
        state: { isDetailsPaneInFocus: true },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const updateOrganization = useCallback((
    { [SUBMIT_ACTION_FIELD_NAME]: submitAction, ...values },
    { getFieldState },
  ) => {
    const { [BANKING_INFORMATION_FIELD_NAME]: bankingInformation, ...data } = values;

    return mutator.editOrganizationOrg.PUT(data)
      .then(() => {
        return manageBankingInformation({
          initBankingInformation: getFieldState(BANKING_INFORMATION_FIELD_NAME)?.initial,
          bankingInformation,
          organization: values,
        });
      })
      .then(() => {
        showCallout({
          messageId: 'ui-organizations.save.success',
          values: { organizationName: data.name },
        });

        switch (submitAction) {
          case SUBMIT_ACTION.saveAndKeepEditing:
            setTimeout(saveAndKeepEditingHandler);
            break;
          case SUBMIT_ACTION.saveAndClose:
          default:
            setTimeout(cancelForm);
            break;
        }
      })
      .catch(async e => {
        await handleSaveErrorResponse(intl, showCallout, e);
      });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [cancelForm, intl, manageBankingInformation, saveAndKeepEditingHandler, showCallout]);

  const initialValues = useMemo(() => ({
    [BANKING_INFORMATION_FIELD_NAME]: bankingInformationData,
    ...organization,
  }), [organization, bankingInformationData]);

  const isLoading = isOrganizationLoading || isBankingInformationLoading;

  if (isLoading) {
    return (
      <Paneset>
        <LoadingPane onClose={cancelForm} />
      </Paneset>
    );
  }

  return (
    <OrganizationForm
      initialValues={initialValues}
      isSubmitDisabled={isOrganizationLoading}
      onSubmit={updateOrganization}
      cancelForm={cancelForm}
      paneTitle={<FormattedMessage id="ui-organizations.editOrg.title" values={{ name: organization.name }} />}
    />
  );
};

OrganizationEdit.manifest = Object.freeze({
  editOrganizationOrg: {
    ...organizationResourceByUrl,
    accumulate: true,
  },
});

OrganizationEdit.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(OrganizationEdit));
