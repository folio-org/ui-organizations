import React from 'react';

import {
  usePagination,
} from '@folio/stripes-acq-components';

import {
  RESULT_COUNT_INCREMENT,
} from '../../common/resources';

import OrganizationsList from './OrganizationsList';
import { useOrganizations } from './hooks';

const resetData = () => {};

export const OrganizationsListContainer = () => {
  const {
    pagination,
    changePage,
    refreshPage,
  } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });
  const {
    organizations,
    totalRecords,
    isFetching,
  } = useOrganizations({ pagination });

  return (
    <OrganizationsList
      onNeedMoreData={changePage}
      resetData={resetData}
      organizationsCount={totalRecords}
      isLoading={isFetching}
      organizations={organizations}
      refreshList={refreshPage}
      pagination={pagination}
    />
  );
};

export default OrganizationsListContainer;
