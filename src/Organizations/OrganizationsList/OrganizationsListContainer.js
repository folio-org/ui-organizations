import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';

import { stripesConnect } from '@folio/stripes/core';
import {
  getFilterParams,
  makeQueryBuilder,
  useLocationReset,
  useList,
} from '@folio/stripes-acq-components';

import { organizationsResource } from '../../common/resources';

import OrganizationsList from './OrganizationsList';
import {
  getKeywordQuery,
} from './OrganizationsListSearchConfig';
import {
  customFilterMap,
} from './OrganizationsListFilter/OrganizationsListFilterConfig';

const RESULT_COUNT_INCREMENT = 30;
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
);

const resetData = () => {};

const OrganizationsListContainer = ({ mutator, location, history }) => {
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
  } = useList(false, loadOrganizations, loadOrganizationsCB, RESULT_COUNT_INCREMENT);

  useLocationReset(history, location, '/organizations', refreshList);

  return (
    <OrganizationsList
      onNeedMoreData={onNeedMoreData}
      resetData={resetData}
      organizationsCount={organizationsCount}
      isLoading={isLoading}
      organizations={organizations}
    />
  );
};

OrganizationsListContainer.manifest = Object.freeze({
  organizationsListOrgs: organizationsResource,
});

OrganizationsListContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(stripesConnect(OrganizationsListContainer));
