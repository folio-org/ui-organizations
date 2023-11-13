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

import { VIEW_ORG_DETAILS } from '../../common/constants';
import { useOrganizationBankingInformation } from '../../common/hooks';
import { organizationResourceByUrl } from '../../common/resources';
import { BANKING_INFORMATION_FIELD_NAME } from '../constants';
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

  useEffect(
    () => {
      mutator.editOrganizationOrg.GET()
        .then(organizationsResponse => {
          setOrganization(organizationsResponse);
        })
        .finally(() => setIsOrganizationLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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

  const updateOrganization = useCallback(
    (values, { getFieldState }) => {
      const { [BANKING_INFORMATION_FIELD_NAME]: bankingInformation, ...data } = values;

      return mutator.editOrganizationOrg.PUT(data)
        .then(() => {
          return manageBankingInformation({
            initBankingInformation: getFieldState(BANKING_INFORMATION_FIELD_NAME).initial,
            bankingInformation,
          });
        })
        .then(() => {
          setTimeout(cancelForm);
          showCallout({
            messageId: 'ui-organizations.save.success',
            values: { organizationName: data.name },
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
