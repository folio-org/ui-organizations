import React, { useCallback } from 'react';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import {
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import FormatTime from '../../Utils/FormatTime';
import {
  fetchOrgsByParam,
  organizationsResource,
} from '../../common/resources';
import {
  OrganizationForm,
  ORG_FORM_NAME,
} from '../OrganizationForm';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';

const INITIAL_VALUES = {
  interfaces: [],
  contacts: [],
  isVendor: false,
};

const OrganizationCreate = ({ history, location, mutator, stripes, intl }) => {
  const cancelForm = useCallback(
    (id) => {
      history.push({
        pathname: id ? `/organizations/view/${id}` : '/organizations',
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const showCallout = useShowCallout();

  const createOrganization = useCallback(
    (data) => {
      const time = FormatTime(data, 'post');

      if (time) data.edi.ediJob.time = time;

      return mutator.createOrganizationOrg.POST(data)
        .then(organization => {
          setTimeout(() => cancelForm(organization.id));
        })
        .catch(async e => {
          await handleSaveErrorResponse(intl, showCallout, e);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelForm],
  );

  const { isVendor, language } = getFormValues(ORG_FORM_NAME)(stripes.store.getState()) || {};

  return (
    <OrganizationForm
      initialValues={INITIAL_VALUES}
      onSubmit={createOrganization}
      cancelForm={cancelForm}
      isVendorForm={isVendor}
      formDefaultLanguage={language}
      fetchOrgByCode={mutator.fetchOrgByCode}
    />
  );
};

OrganizationCreate.manifest = Object.freeze({
  createOrganizationOrg: organizationsResource,
  fetchOrgByCode: fetchOrgsByParam,
});

OrganizationCreate.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  stripes: stripesShape.isRequired,
  mutator: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withRouter(stripesConnect(injectIntl(OrganizationCreate)));
