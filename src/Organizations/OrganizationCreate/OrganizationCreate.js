import React, { useCallback } from 'react';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';

import {
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import FormatTime from '../../Utils/FormatTime';
import { VIEW_ORG_DETAILS } from '../../common/constants';
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

const OrganizationCreate = ({ history, location, mutator, stripes }) => {
  const cancelForm = useCallback(
    (id) => {
      history.push({
        pathname: id ? `${VIEW_ORG_DETAILS}${id}` : '/organizations',
        search: location.search,
      });
    },
    [history, location.search],
  );

  const showCallout = useShowCallout();
  const intl = useIntl();
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
    [cancelForm, intl, showCallout],
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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  stripes: stripesShape.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(OrganizationCreate));
