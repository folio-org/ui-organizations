import filter from 'lodash/fp/filter';
import flatMap from 'lodash/fp/flatMap';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import keyBy from 'lodash/fp/keyBy';
import uniq from 'lodash/fp/uniq';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import {
  fetchAcqUnitsByIds,
  getVersionMetadata,
  useOrganization,
  useUsersBatch,
  useVersionHistoryValueResolvers,
} from '@folio/stripes-acq-components';
import { currenciesByCode } from '@folio/stripes/components';

import {
  useContactsByIds,
  useInterfacesByIds,
  useTypes,
} from '../../../../common/hooks';

const getUniqItems = (arr) => (
  flow(
    uniq,
    filter(Boolean),
  )(arr)
);

export const useSelectedOrganizationVersion = ({ versionId, versions, snapshotPath }, options = {}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organization-version-data' });

  const {
    getObjectPropertyById,
    getUserFullNameById,
  } = useVersionHistoryValueResolvers();

  const currentVersion = useMemo(() => (
    versions?.find(({ id }) => id === versionId)
  ), [versionId, versions]);

  const versionSnapshot = useMemo(() => (
    get(snapshotPath, currentVersion)
  ), [snapshotPath, currentVersion]);

  const {
    organization,
    isLoading: isOrganizationLoading,
  } = useOrganization(currentVersion?.organizationId);

  const metadata = useMemo(() => getVersionMetadata(currentVersion, organization), [currentVersion, organization]);
  const createdByUserId = metadata?.createdByUserId;

  const versionUserIds = useMemo(() => getUniqItems([createdByUserId]), [createdByUserId]);
  const {
    users,
    isLoading: isUsersLoading,
  } = useUsersBatch(versionUserIds);

  const {
    contacts,
    isLoading: isContactsLoading,
  } = useContactsByIds(versionSnapshot?.contacts);

  const {
    interfaces,
    isLoading: isInterfacesLoading,
  } = useInterfacesByIds(versionSnapshot?.interfaces);

  const {
    organizationTypes,
    isLoading: isOrganizationTypesLoading,
  } = useTypes();

  const {
    isLoading: isVersionDataLoading,
    data = {},
  } = useQuery({
    queryKey: [namespace, versionId, versionSnapshot?.id],
    queryFn: async () => {
      const acqUnitsIds = [
        ...get('acqUnitIds', versionSnapshot, []),
        ...flow(
          get('accounts'),
          flatMap('acqUnitIds'),
          uniq,
        )(versionSnapshot),
      ];

      const [acqUnitsMap] = await Promise.all([
        fetchAcqUnitsByIds(ky)(acqUnitsIds).then(keyBy('id')),
      ]);

      const vendorCurrenciesValue = versionSnapshot?.vendorCurrencies?.map(currency => {
        const currencyInfo = currenciesByCode[currency];

        return currencyInfo ? `${currencyInfo.currency} (${currencyInfo.code})` : currency;
      }).join(', ');

      return {
        ...versionSnapshot,
        accounts: versionSnapshot?.accounts?.map((account) => ({
          ...account,
          acqUnits: account?.acqUnitIds?.map((id) => getObjectPropertyById(id, 'name', acqUnitsMap)),
        })),
        acqUnits: acqUnitsIds.map((id) => getObjectPropertyById(id, 'name', acqUnitsMap)).join(', '),
        vendorCurrenciesValue,
        metadata,
      };
    },
    enabled: Boolean(versionId && organization?.id),
    ...options,
  });

  const selectedVersion = useMemo(() => {
    const versionUsersDict = keyBy('id', users);
    const organizationTypesDict = keyBy('id', organizationTypes);

    return {
      ...data,
      organizationTypesResolved: data.organizationTypes?.map((id) => getObjectPropertyById(id, 'name', organizationTypesDict))?.join(', '),
      createdByUser: getUserFullNameById(createdByUserId, versionUsersDict),
      contactsList: contacts,
      interfacesList: interfaces,
    };
  }, [
    getObjectPropertyById,
    getUserFullNameById,
    users,
    createdByUserId,
    data,
    contacts,
    interfaces,
    organizationTypes,
  ]);

  const isLoading = (
    isOrganizationLoading
    || isUsersLoading
    || isVersionDataLoading
    || isContactsLoading
    || isInterfacesLoading
    || isOrganizationTypesLoading
  );

  return {
    isLoading,
    selectedVersion,
  };
};
