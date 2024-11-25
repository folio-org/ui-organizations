import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { AUDIT_ACQ_EVENTS_API } from '@folio/stripes-acq-components';

const DEFAULT_DATA = [];

export const useOrganizationVersions = (organizationId, options = {}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organization-versions' });

  const searchParams = {
    sortBy: 'event_date',
    sortOrder: 'desc',
  };

  const { isLoading, data } = useQuery(
    [namespace, organizationId],
    ({ signal }) => ky.get(`${AUDIT_ACQ_EVENTS_API}/organization/${organizationId}`, { signal, searchParams }).json(),
    {
      enabled: Boolean(organizationId),
      ...options,
    },
  );

  return {
    isLoading,
    versions: data?.organizationAuditEvents || DEFAULT_DATA,
  };
};
