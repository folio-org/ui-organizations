import chunk from 'lodash/chunk';
import { useCallback } from 'react';

import { useShowCallout } from '@folio/stripes-acq-components';

import { useBankingInformationMutation } from '../common/hooks';
import { getArrayItemsChanges } from '../common/utils';

const execute = (fn, arr) => chunk(arr, 5).reduce((acc, chunked) => {
  return acc.then(() => Promise.all(chunked.map((bankingInformation) => fn({ bankingInformation }))));
}, Promise.resolve());

export const useBankingInformationManager = () => {
  const showCallout = useShowCallout();

  const {
    createBankingInformation,
    updateBankingInformation,
    deleteBankingInformation,
    isLoading,
  } = useBankingInformationMutation();

  const manageBankingInformation = useCallback(({
    initBankingInformation,
    bankingInformation,
  }) => {
    const {
      created,
      updated,
      deleted,
    } = getArrayItemsChanges(initBankingInformation, bankingInformation);

    return Promise.all([
      execute(createBankingInformation, created),
      execute(updateBankingInformation, updated),
      execute(deleteBankingInformation, deleted),
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
