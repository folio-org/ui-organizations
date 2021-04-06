import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment-timezone';

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

import FormatTime from '../../Utils/FormatTime';
import { VIEW_ORG_DETAILS } from '../../common/constants';
import {
  organizationResourceByUrl,
} from '../../common/resources';
import {
  OrganizationForm,
} from '../OrganizationForm';
import { handleSaveErrorResponse } from '../handleSaveErrorResponse';

const OrganizationEdit = ({ match, history, location, mutator }) => {
  const organizationId = match.params.id;

  const [organization, setOrganization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const showCallout = useShowCallout();
  const intl = useIntl();

  useEffect(
    () => {
      mutator.editOrganizationOrg.GET()
        .then(organizationsResponse => {
          // TODO: change time to UTC-0
          if (organizationsResponse?.edi?.ediJob?.time) {
            organizationsResponse.edi.ediJob.time = moment(
              organizationsResponse.edi.ediJob.time,
            ).format('hh:mm:ss');
          }

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
  mutator: PropTypes.object.isRequired,
};

export default withRouter(stripesConnect(OrganizationEdit));
