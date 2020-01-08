import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Paneset,
  MultiColumnList,
} from '@folio/stripes/components';
import {
  FiltersPane,
  ResultsPane,
  ResetButton,
  SingleSearchForm,
  useLocationFilters,
  useLocationSorting,
} from '@folio/stripes-acq-components';

import { OrganizationDetailsContainer } from '../OrganizationDetails';
import OrganizationsListFilter from './OrganizationsListFilter';

const resultsPaneTitle = <FormattedMessage id="ui-organizations.meta.title" />;
const visibleColumns = ['name', 'code', 'description', 'status', 'isVendor'];
const sortableFields = ['name', 'code', 'description', 'status', 'isVendor'];
const columnMapping = {
  name: <FormattedMessage id="ui-organizations.main.name" />,
  code: <FormattedMessage id="ui-organizations.main.code" />,
  description: <FormattedMessage id="ui-organizations.main.description" />,
  status: <FormattedMessage id="ui-organizations.main.vendorStatus" />,
  isVendor: <FormattedMessage id="ui-organizations.main.isVendor" />,
};
const resultsFormatter = {
  status: data => <FormattedMessage id={`ui-organizations.organizationStatus.${data.status.toLowerCase()}`} />,
  isVendor: data => <FormattedMessage id={`ui-organizations.main.isVendor.${data.isVendor ? 'yes' : 'no'}`} />,
};

const OrganizationsList = ({
  match,
  history,
  isLoading,
  location,
  onNeedMoreData,
  resetData,
  organizations,
  organizationsCount,
}) => {
  const [
    filters,
    searchQuery,
    applyFilters,
    applySearch,
    changeSearch,
    resetFilters,
  ] = useLocationFilters(location, history, resetData);
  const [
    sortingField,
    sortingDirection,
    changeSorting,
  ] = useLocationSorting(location, history, resetData, sortableFields);

  const openOrganizationDetails = useCallback(
    (e, meta) => {
      history.push({
        pathname: `${match.path}/${meta.id}/view`,
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [match.path, location.search],
  );

  return (
    <Paneset>
      <FiltersPane>
        <SingleSearchForm
          applySearch={applySearch}
          changeSearch={changeSearch}
          searchQuery={searchQuery}
          isLoading={isLoading}
          ariaLabelId="ui-receiving.titles.search"
        />

        <ResetButton
          id="reset-organizations-filters"
          reset={resetFilters}
          disabled={!location.search}
        />

        <OrganizationsListFilter
          activeFilters={filters}
          applyFilters={applyFilters}
        />
      </FiltersPane>

      <ResultsPane
        title={resultsPaneTitle}
        count={organizationsCount}
      >
        <MultiColumnList
          id="organizations-list"
          totalCount={organizationsCount}
          contentData={organizations}
          visibleColumns={visibleColumns}
          columnMapping={columnMapping}
          formatter={resultsFormatter}
          loading={isLoading}
          autosize
          virtualize
          onNeedMoreData={onNeedMoreData}
          sortOrder={sortingField}
          sortDirection={sortingDirection}
          onHeaderClick={changeSorting}
          onRowClick={openOrganizationDetails}
        />
      </ResultsPane>

      <Route
        path={`${match.path}/:id/view`}
        component={OrganizationDetailsContainer}
      />
    </Paneset>
  );
};

OrganizationsList.propTypes = {
  onNeedMoreData: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  organizationsCount: PropTypes.number,
  isLoading: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.object),
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

OrganizationsList.defaultProps = {
  organizationsCount: 0,
  isLoading: false,
  organizations: [],
};

export default withRouter(OrganizationsList);
