import chunk from 'lodash/chunk';
import { useCallback } from 'react';

import { useShowCallout } from '@folio/stripes-acq-components';

import {
  useBankingInformationMutation,
  useBankingInformationSettings,
} from '../common/hooks';
import { getArrayItemsChanges } from '../common/utils';

const executeSequentially = (fn, arr) => arr.reduce((acc, curr) => {
  return acc.then(() => fn({ bankingInformation: curr }));
}, Promise.resolve());

const executeParallel = (fn, arr) => chunk(arr, 5).reduce((acc, chunked) => {
  return acc.then(() => Promise.all(chunked.map((bankingInformation) => fn({ bankingInformation }))));
}, Promise.resolve());

export const useBankingInformationManager = () => {
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
    if (!(organization.isVendor && isBankingInformationEnabled)) return Promise.resolve();

    const {
      created,
      updated,
      deleted,
    } = getArrayItemsChanges(initBankingInformation, bankingInformation);

    return Promise.all([
      executeSequentially(createBankingInformation, created.map((item) => ({ organizationId: organization.id, ...item }))),
      executeParallel(updateBankingInformation, updated),
      executeParallel(deleteBankingInformation, deleted),
    ]).catch(() => {
      showCallout({
        type: 'error',
        messageId: 'ui-organizations.bankingInformation.save.error',
      });
    });
  }, [showCallout]);

  return {
    manageBankingInformation,
    isLoading,
  };
};
