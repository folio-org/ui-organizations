import get from 'lodash/get';
import {
  memo,
  useCallback,
  useMemo,
} from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  useOrganization,
  VersionHistoryPane,
  VersionView,
  VersionViewContextProvider,
} from '@folio/stripes-acq-components';
import { TitleManager } from '@folio/stripes/core';

import {
  ORGANIZATION_VERSIONS_VIEW_ROUTE,
  ORGANIZATIONS_ROUTE,
  VIEW_ORG_DETAILS,
} from '../../common/constants';
import { HIDDEN_FIELDS_FOR_ORGANIZATION_VERSION_HISTORY } from '../constants';
import { getOrganizationFieldsLabelMap } from './getOrganizationFieldsLabelMap';
import { useOrganizationVersions } from './hooks';

const OrganizationVersion = ({
  history,
  location,
  match,
}) => {
  const { id: organizationId, versionId } = match.params;
  const snapshotPath = 'organizationSnapshot.map';

  const {
    isLoading: isOrganizationLoading,
    organization,
  } = useOrganization(organizationId);

  const onHistoryClose = useCallback(() => history.push({
    pathname: `${VIEW_ORG_DETAILS}${organizationId}`,
    search: location.search,
  }), [history, location.search, organizationId]);

  const onVersionClose = useCallback(() => history.push({
    pathname: ORGANIZATIONS_ROUTE,
    search: location.search,
  }), [history, location.search]);

  const onSelectVersion = useCallback((_versionId) => {
    history.push({
      pathname: `${ORGANIZATION_VERSIONS_VIEW_ROUTE}/${_versionId}`,
      search: location.search,
    });
  }, [history, location.search]);

  const {
    versions,
    isLoading: isHistoryLoading,
  } = useOrganizationVersions(organizationId, {
    onSuccess: ({ organizationAuditEvents }) => {
      if (!versionId && organizationAuditEvents[0]?.id) onSelectVersion(organizationAuditEvents[0].id);
    },
  });

  const isVersionLoading = (
    isOrganizationLoading || isHistoryLoading
  );

  const labelsMap = useMemo(() => getOrganizationFieldsLabelMap(), []);

  return (
    <VersionViewContextProvider
      snapshotPath={snapshotPath}
      versions={versions}
      versionId={versionId}
    >
      <TitleManager record={organization?.name} />
      <VersionView
        id="organization"
        dismissible
        isLoading={isVersionLoading}
        onClose={onVersionClose}
        paneTitle={organization?.name}
        tags={get(organization, 'tags.tagList', [])}
        versionId={versionId}
      >
        {/* TODO: https://folio-org.atlassian.net/browse/UIORGS-356 */}
      </VersionView>

      <VersionHistoryPane
        currentVersion={versionId}
        id="organization"
        isLoading={isHistoryLoading}
        onClose={onHistoryClose}
        onSelectVersion={onSelectVersion}
        snapshotPath={snapshotPath}
        labelsMap={labelsMap}
        versions={versions}
        hiddenFields={HIDDEN_FIELDS_FOR_ORGANIZATION_VERSION_HISTORY}
      />
    </VersionViewContextProvider>
  );
};

OrganizationVersion.propTypes = {
  history: ReactRouterPropTypes.history,
  location: ReactRouterPropTypes.location,
  match: ReactRouterPropTypes.match,
};

export default memo(OrganizationVersion);
