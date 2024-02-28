import chunk from 'lodash/chunk';
import { useCallback } from 'react';

import { useStripes } from '@folio/stripes/core';
import { useShowCallout } from '@folio/stripes-acq-components';

import {
  useBankingInformationMutation,
  useBankingInformationSettings,
} from '../common/hooks';
import { getArrayItemsChanges } from '../common/utils';

const executeSequentially = (fn, arr, hasPerm) => {
  if (!hasPerm) return Promise.resolve();

  return arr.reduce((acc, curr) => {
    return acc.then(() => fn({ bankingInformation: curr }));
  }, Promise.resolve());
};

const executeParallel = (fn, arr, hasPerm) => {
  if (!hasPerm) return Promise.resolve();

  return chunk(arr, 5).reduce((acc, chunked) => {
    return acc.then(() => Promise.all(chunked.map((bankingInformation) => fn({ bankingInformation }))));
  }, Promise.resolve());
};

export const useBankingInformationManager = () => {
  const stripes = useStripes();
  const showCallout = useShowCallout();

  const { enabled: isBankingInformationEnabled } = useBankingInformationSettings();

  const {
    createBankingInformation,
    updateBankingInformation,
    deleteBankingInformation,
    isLoading,
  } = useBankingInformationMutation();

  const manageBankingInformation = useCallback(({
    initBankingInformation,
    bankingInformation,
    organization,
  }) => {
    const isOperationRestricted = !(organization.isVendor && isBankingInformationEnabled);

    if (isOperationRestricted) return Promise.resolve();

    const {
      created,
      updated,
      deleted,
    } = getArrayItemsChanges(initBankingInformation, bankingInformation);

    return Promise.all([
      executeSequentially(
        createBankingInformation,
        created.map((item) => ({ organizationId: organization.id, ...item })),
        stripes.hasPerm('organizations.banking-information.item.post'),
      ),
      executeParallel(updateBankingInformation, updated, stripes.hasPerm('organizations.banking-information.item.put')),
      executeParallel(deleteBankingInformation, deleted, stripes.hasPerm('organizations.banking-information.item.delete')),
    ]).catch(() => {
      showCallout({
        type: 'error',
        messageId: 'ui-organizations.bankingInformation.save.error',
      });
    });
  }, [
    createBankingInformation,
    deleteBankingInformation,
    isBankingInformationEnabled,
    showCallout,
    stripes,
    updateBankingInformation,
  ]);

  return {
    manageBankingInformation,
    isLoading,
  };
};
