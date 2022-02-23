import React, {
  useCallback,
  useEffect,
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
import {
  organizationResourceByUrl,
  typesResource,
} from '../../common/resources';
import {
  OrganizationForm,
} from '../OrganizationForm';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';

export const OrganizationEdit = ({ match, history, location, mutator, resources: { organizationTypes } }) => {
  const organizationId = match.params.id;

  const [organization, setOrganization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const showCallout = useShowCallout();
  const intl = useIntl();

  useEffect(
    () => {
      mutator.editOrganizationOrg.GET()
        .then(organizationsResponse => {
          setOrganization(organizationsResponse);
        })
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
        state: { isDetailsPaneInFocus: true },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const updateOrganization = useCallback(
    (data) => {
      return mutator.editOrganizationOrg.PUT(data)
        .then(() => {
          setTimeout(cancelForm);
        })
        .catch(async e => {
          await handleSaveErrorResponse(intl, showCallout, e);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelForm, intl, showCallout],
  );

  if (isLoading) {
    return (
      <Paneset>
        <LoadingPane onClose={cancelForm} />
      </Paneset>
    );
  }

  return (
    <OrganizationForm
      initialValues={organization}
      onSubmit={updateOrganization}
      cancelForm={cancelForm}
      paneTitle={<FormattedMessage id="ui-organizations.editOrg.title" values={{ name: organization.name }} />}
      organizationTypes={organizationTypes}
    />
  );
};

OrganizationEdit.manifest = Object.freeze({
  editOrganizationOrg: {
    ...organizationResourceByUrl,
    accumulate: true,
  },
  organizationTypes: {
    ...typesResource,
    fetch: true,
  },
});

OrganizationEdit.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.shape({
    organizationTypes: PropTypes.object,
  }).isRequired,
};

export default withRouter(stripesConnect(OrganizationEdit));
