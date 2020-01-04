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

const RESULT_COUNT_INCREMENT = 30;
const buildTitlesQuery = makeQueryBuilder(
  'cql.allRecords=1 sortby title',
  (query) => `(title=${query}*)`,
);

const resetData = () => {};

const OrganizationsListContainer = ({ mutator, location }) => {
  const [titles, setTitles] = useState([]);
  const [titlesCount, setTitlesCount] = useState(0);
  const [titlesOffset, setTitlesOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadTitles = (offset) => {
    setIsLoading(true);

    return mutator.organizationsListOrgs.GET({
      params: {
        limit: RESULT_COUNT_INCREMENT,
        offset,
        query: buildTitlesQuery(queryString.parse(location.search)),
      },
    })
      .then(response => {
        if (!offset) setTitlesCount(response.totalRecords);

        setTitles((prev) => [...prev, ...response.organizations]);
      })
      .finally(() => setIsLoading(false));
  };

  const onNeedMoreData = useCallback(
    () => {
      const newOffset = titlesOffset + RESULT_COUNT_INCREMENT;

      loadTitles(newOffset)
        .then(() => {
          setTitlesOffset(newOffset);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [titlesOffset],
  );

  useEffect(
    () => {
      setTitles([]);
      setTitlesOffset(0);
      loadTitles(0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  return (
    <OrganizationsList
      onNeedMoreData={onNeedMoreData}
      resetData={resetData}
      titlesCount={titlesCount}
      isLoading={isLoading}
      titles={titles}
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
