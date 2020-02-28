import React, {
  useCallback,
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
  makeQueryBuilder,
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

const OrganizationsListContainer = ({ mutator, location: { search } }) => {
  const [organizations, setOrganizations] = useState([]);
  const [organizationsCount, setOrganizationsCount] = useState(0);
  const [organizationsOffset, setOrganizationsOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrganizations = (offset) => {
    setIsLoading(true);

    const loadOrgsPromise = !search
      ? Promise.resolve()
      : mutator.organizationsListOrgs.GET({
        params: {
          limit: RESULT_COUNT_INCREMENT,
          offset,
          query: buildTitlesQuery(queryString.parse(search)),
        },
      })
        .then(organizationsResponse => {
          if (!offset) setOrganizationsCount(organizationsResponse.totalRecords);

          setOrganizations((prev) => [...prev, ...organizationsResponse.organizations]);
        });

    return loadOrgsPromise
      .finally(() => setIsLoading(false));
  };

  const onNeedMoreData = useCallback(
    () => {
      const newOffset = organizationsOffset + RESULT_COUNT_INCREMENT;

      loadOrganizations(newOffset)
        .then(() => {
          setOrganizationsOffset(newOffset);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organizationsOffset],
  );

  useEffect(
    () => {
      setOrganizations([]);
      setOrganizationsOffset(0);
      loadOrganizations(0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  );

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
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(stripesConnect(OrganizationsListContainer));
