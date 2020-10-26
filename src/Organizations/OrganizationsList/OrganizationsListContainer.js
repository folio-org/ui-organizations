import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';

import { stripesConnect } from '@folio/stripes/core';
import {
  makeQueryBuilder,
  useList,
} from '@folio/stripes-acq-components';

import {
  RESULT_COUNT_INCREMENT,
  organizationsResource,
} from '../../common/resources';

import OrganizationsList from './OrganizationsList';
import {
  getKeywordQuery,
} from './OrganizationsListSearchConfig';
import {
  customFilterMap,
  CUSTOM_SORT_MAP,
} from './OrganizationsListFilter/OrganizationsListFilterConfig';

const buildTitlesQuery = makeQueryBuilder(
  'cql.allRecords=1',
  (query, qindex) => {
    if (qindex) {
      return `(${qindex}=${query}*)`;
    }

    return getKeywordQuery(query);
  },
  'sortby name/sort.ascending',
  customFilterMap,
  CUSTOM_SORT_MAP,
);

const resetData = () => {};

const OrganizationsListContainer = ({ mutator, location }) => {
  const loadOrganizations = (offset) => mutator.organizationsListOrgs.GET({
    params: {
      limit: RESULT_COUNT_INCREMENT,
      offset,
      query: buildTitlesQuery(queryString.parse(location.search)),
    },
  });

  const loadOrganizationsCB = (setOrganizations, organizationsResponse) => {
    setOrganizations((prev) => [...prev, ...organizationsResponse.organizations]);
  };

  const {
    records: organizations,
    recordsCount: organizationsCount,
    isLoading,
    onNeedMoreData,
    refreshList,
    resultsPaneTitleRef,
  } = useList(false, loadOrganizations, loadOrganizationsCB, RESULT_COUNT_INCREMENT);

  return (
    <OrganizationsList
      onNeedMoreData={onNeedMoreData}
      resetData={resetData}
      organizationsCount={organizationsCount}
      isLoading={isLoading}
      organizations={organizations}
      refreshList={refreshList}
      resultsPaneTitleRef={resultsPaneTitleRef}
    />
  );
};

OrganizationsListContainer.manifest = Object.freeze({
  organizationsListOrgs: organizationsResource,
});

OrganizationsListContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(stripesConnect(OrganizationsListContainer));
