import React, { useCallback } from 'react';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import {
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';

import FormatTime from '../../Utils/FormatTime';
import { organizationsResource } from '../../common/resources';
import {
  OrganizationForm,
  ORG_FORM_NAME,
} from '../OrganizationForm';

const INITIAL_VALUES = {
  interfaces: [],
  contacts: [],
  isVendor: false,
};

const OrganizationCreate = ({ history, location, mutator, stripes }) => {
  const cancelForm = useCallback(
    (id) => {
      history.push({
        pathname: id ? `/organizations/${id}/view` : '/organizations',
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const createOrganization = useCallback(
    (data) => {
      const time = FormatTime(data, 'post');

      if (time) data.edi.ediJob.time = time;

      mutator.createOrganizationOrg.POST(data)
        .then(organization => {
          cancelForm(organization.id);
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
    />
  );
};

OrganizationCreate.manifest = Object.freeze({
  createOrganizationOrg: organizationsResource,
});

OrganizationCreate.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  stripes: stripesShape.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(OrganizationCreate));
