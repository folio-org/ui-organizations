import PropTypes from 'prop-types';
import {
  useCallback,
  useMemo,
} from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { withRouter } from 'react-router-dom';

import { Paneset } from '@folio/stripes/components';
import {
  LoadingPane,
  useOrganization,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  ORGANIZATIONS_ROUTE,
  VIEW_ORG_DETAILS,
} from '../../common/constants';
import {
  useOrganizationBankingInformation,
  useOrganizationMutation,
} from '../../common/hooks';
import {
  BANKING_INFORMATION_FIELD_NAME,
  SUBMIT_ACTION,
  SUBMIT_ACTION_FIELD_NAME,
} from '../constants';
import { OrganizationForm } from '../OrganizationForm';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';
import { useBankingInformationManager } from '../useBankingInformationManager';

export const OrganizationEdit = ({ match, history, location }) => {
  const organizationId = match.params.id;
  const showCallout = useShowCallout();
  const intl = useIntl();

  const { manageBankingInformation } = useBankingInformationManager();

  const {
    bankingInformation: bankingInformationData,
    isLoading: isBankingInformationLoading,
  } = useOrganizationBankingInformation(organizationId);

  const {
    organization,
    isFetching: isOrganizationFetching,
    isLoading: isOrganizationLoading,
    refetch,
  } = useOrganization(organizationId);

  const {
    updateOrganization,
    isLoading: isUpdateOrganizationLoading,
  } = useOrganizationMutation();

  const saveAndKeepEditingHandler = useCallback(async () => {
    await refetch();

    history.push({
      pathname: `${ORGANIZATIONS_ROUTE}/${organizationId}/edit`,
      search: location.search,
    });
  }, [history, location.search, organizationId, refetch]);

  const cancelForm = useCallback(
    () => {
      history.push({
        pathname: `${VIEW_ORG_DETAILS}${organizationId}`,
        search: location.search,
        state: { isDetailsPaneInFocus: true },
      });
    },
    [history, location.search, organizationId],
  );

  const onSubmit = useCallback((
    { [SUBMIT_ACTION_FIELD_NAME]: submitAction, ...values },
    form,
  ) => {
    const { [BANKING_INFORMATION_FIELD_NAME]: bankingInformation, ...data } = values;

    return updateOrganization({ data })
      .then(() => {
        return manageBankingInformation({
          initBankingInformation: form.getFieldState(BANKING_INFORMATION_FIELD_NAME)?.initial,
          bankingInformation,
          organization: values,
        });
      })
      .then(async () => {
        showCallout({
          messageId: 'ui-organizations.save.success',
          values: { organizationName: data.name },
        });

        switch (submitAction) {
          case SUBMIT_ACTION.saveAndKeepEditing:
            await saveAndKeepEditingHandler();
            form.restart();
            break;
          case SUBMIT_ACTION.saveAndClose:
          default:
            cancelForm();
            break;
        }
      })
      .catch(async (e) => {
        await handleSaveErrorResponse(intl, showCallout, e?.response);
      });
  },
  [cancelForm, intl, manageBankingInformation, saveAndKeepEditingHandler, showCallout, updateOrganization]);

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
      isSubmitDisabled={isOrganizationFetching || isUpdateOrganizationLoading}
      onSubmit={onSubmit}
      cancelForm={cancelForm}
      paneTitle={<FormattedMessage id="ui-organizations.editOrg.title" values={{ name: organization.name }} />}
    />
  );
};

OrganizationEdit.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(OrganizationEdit);
