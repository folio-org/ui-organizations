import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { VENDORS_API } from '@folio/stripes-acq-components';

export const useOrganizationMutation = (options = {}) => {
  const ky = useOkapiKy();

  const {
    isLoading: isCreateOrganizationLoading,
    mutateAsync: createOrganization,
  } = useMutation({
    mutationFn: ({ data }) => {
      return ky.post(VENDORS_API, { json: data }).json();
    },
    ...options,
  });

  const {
    isLoading: isUpdateOrganizationLoading,
    mutateAsync: updateOrganization,
  } = useMutation({
    mutationFn: ({ data }) => {
      return ky.put(`${VENDORS_API}/${data.id}`, { json: data }).json();
    },
    ...options,
  });

  const isLoading = isCreateOrganizationLoading || isUpdateOrganizationLoading;

  return {
    isLoading,
    createOrganization,
    updateOrganization,
  };
};
