import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';
import {
  Paneset,
} from '@folio/stripes/components';
import {
  LoadingPane,
  useShowCallout,
} from '@folio/stripes-acq-components';

import FormatTime from '../../Utils/FormatTime';
import { VIEW_ORG_DETAILS } from '../../common/constants';
import {
  fetchOrgsByParam,
  organizationResourceByUrl,
} from '../../common/resources';
import {
  OrganizationForm,
  ORG_FORM_NAME,
} from '../OrganizationForm';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';

const OrganizationEdit = ({ match, history, location, mutator, stripes, intl }) => {
  const organizationId = match.params.id;

  const [organization, setOrganization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const showCallout = useShowCallout();

  useEffect(
    () => {
      mutator.editOrganizationOrg.GET()
        .then(organizationsResponse => setOrganization(organizationsResponse))
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const cancelForm = useCallback(
    () => {
      history.push({
        pathname: `${VIEW_ORG_DETAILS}${organizationId}`,
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const updateOrganization = useCallback(
    (data) => {
      const time = FormatTime(data, 'post');

      if (time) data.edi.ediJob.time = time;

      return mutator.editOrganizationOrg.PUT(data)
        .then(() => {
          setTimeout(cancelForm);
        })
        .catch(async e => {
          await handleSaveErrorResponse(intl, showCallout, e);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelForm],
  );

  if (isLoading) {
    return (
      <Paneset>
        <LoadingPane onClose={cancelForm} />
      </Paneset>
    );
  }

  const { isVendor, language } = getFormValues(ORG_FORM_NAME)(stripes.store.getState()) || {};

  return (
    <OrganizationForm
      initialValues={organization}
      onSubmit={updateOrganization}
      cancelForm={cancelForm}
      paneTitle={<FormattedMessage id="ui-organizations.editOrg.title" values={{ name: organization.name }} />}
      isVendorForm={isVendor}
      formDefaultLanguage={language}
      fetchOrgByCode={mutator.fetchOrgByCode}
    />
  );
};

OrganizationEdit.manifest = Object.freeze({
  editOrganizationOrg: {
    ...organizationResourceByUrl,
    accumulate: true,
  },
  fetchOrgByCode: fetchOrgsByParam,
});

OrganizationEdit.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  stripes: stripesShape.isRequired,
  mutator: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withRouter(stripesConnect(injectIntl(OrganizationEdit)));
