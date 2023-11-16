import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { BANKING_INFORMATION_API } from '../../constants';

export const useBankingInformationMutation = () => {
  const ky = useOkapiKy();

  const {
    mutateAsync: createBankingInformation,
    isLoading: isBankingInformationCreateLoading,
  } = useMutation({
    mutationFn: ({ bankingInformation }) => {
      return ky.post(BANKING_INFORMATION_API, { json: bankingInformation }).json();
    },
  });

  const {
    mutateAsync: updateBankingInformation,
    isLoading: isBankingInformationUpdateLoading,
  } = useMutation({
    mutationFn: ({ bankingInformation }) => {
      return ky.put(
        `${BANKING_INFORMATION_API}/${bankingInformation.id}`,
        { json: bankingInformation },
      ).json();
    },
  });

  const {
    mutateAsync: deleteBankingInformation,
    isLoading: isBankingInformationDeleteLoading,
  } = useMutation({
    mutationFn: ({ bankingInformation }) => {
      return ky.delete(`${BANKING_INFORMATION_API}/${bankingInformation.id}`).json();
    },
  });

  const isLoading = (
    isBankingInformationCreateLoading
    || isBankingInformationDeleteLoading
    || isBankingInformationUpdateLoading
  );

  return {
    createBankingInformation,
    updateBankingInformation,
    deleteBankingInformation,
    isLoading,
  };
};
