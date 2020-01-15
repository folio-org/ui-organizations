import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
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
} from '@folio/stripes-acq-components';

import FormatTime from '../../Utils/FormatTime';
import { organizationResourceByUrl } from '../../common/resources';
import {
  OrganizationForm,
  ORG_FORM_NAME,
} from '../OrganizationForm';

const OrganizationEdit = ({ match, history, location, mutator, stripes }) => {
  const organizationId = match.params.id;

  const [organization, setOrganization] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        pathname: `/organizations/${organizationId}/view`,
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

      mutator.editOrganizationOrg.PUT(data)
        .then(() => cancelForm());
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
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  stripes: stripesShape.isRequired,
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(OrganizationEdit));
