import get from 'lodash/fp/get';
import filter from 'lodash/fp/filter';
import flatMap from 'lodash/fp/flatMap';
import flow from 'lodash/fp/flow';
import keyBy from 'lodash/fp/keyBy';
import uniq from 'lodash/fp/uniq';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import { getFullName } from '@folio/stripes/util';
import {
  fetchAcqUnitsByIds,
  getVersionMetadata,
  useOrganization,
  useUsersBatch,
} from '@folio/stripes-acq-components';
import { currenciesByCode } from '@folio/stripes/components';

import {
  useContactsByIds,
  useInterfacesByIds,
} from '../../../../common/hooks';

const getUniqItems = (arr) => (
  flow(
    uniq,
    filter(Boolean),
  )(arr)
);

export const useSelectedOrganizationVersion = ({ versionId, versions, snapshotPath }, options = {}) => {
  const intl = useIntl();
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'organization-version-data' });

  const deletedRecordLabel = intl.formatMessage({ id: 'stripes-acq-components.versionHistory.deletedRecord' });

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
    isLoading: isVersionDataLoading,
    data = {},
  } = useQuery(
    [namespace, versionId, versionSnapshot?.id],
    async () => {
      const acqUnitsIds = [
        ...get('acqUnitIds', versionSnapshot, []),
        ...flow(
          get('accounts'),
          flatMap('acqUnitIds'),
          uniq,
        )(versionSnapshot),
      ];

      const [
        acqUnitsMap,
      ] = await Promise.all([
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
          acqUnits: account?.acqUnitIds?.map((acqUnitId) => acqUnitsMap[acqUnitId]?.name || deletedRecordLabel),
        })),
        acqUnits: acqUnitsIds.map(acqUnitsId => acqUnitsMap[acqUnitsId]?.name || deletedRecordLabel).join(', '),
        alternativeNames: versionSnapshot?.aliases?.map(({ value }) => value).join(', '),
        vendorCurrenciesValue,
        metadata,
      };
    },
    {
      enabled: Boolean(versionId && organization?.id),
      ...options,
    },
  );

  const selectedVersion = useMemo(() => {
    const versionUsersMap = keyBy('id', users);

    const createdByUser = versionUsersMap[createdByUserId]
      ? getFullName(versionUsersMap[createdByUserId])
      : deletedRecordLabel;

    return {
      ...data,
      createdByUser: createdByUserId && createdByUser,
      contactsList: contacts,
      interfacesList: interfaces,
    };
  }, [users, createdByUserId, deletedRecordLabel, data, contacts, interfaces]);

  const isLoading = (
    isOrganizationLoading
    || isUsersLoading
    || isVersionDataLoading
    || isContactsLoading
    || isInterfacesLoading
  );

  return {
    isLoading,
    selectedVersion,
  };
};
