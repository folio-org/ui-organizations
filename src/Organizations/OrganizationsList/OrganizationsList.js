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
  useToggle,
} from '@folio/stripes-acq-components';

import { VIEW_ORG_DETAILS } from '../../common/constants';
import { OrganizationDetailsContainer } from '../OrganizationDetails';
import OrganizationsListFilter from './OrganizationsListFilter';
import {
  searchableIndexes,
} from './OrganizationsListSearchConfig';
import OrganizationsListLastMenu from './OrganizationsListLastMenu';

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
    changeIndex,
    searchIndex,
  ] = useLocationFilters(location, history, resetData);
  const [
    sortingField,
    sortingDirection,
    changeSorting,
  ] = useLocationSorting(location, history, resetData, sortableFields);

  const [isFiltersOpened, toggleFilters] = useToggle(true);

  const openOrganizationDetails = useCallback(
    (e, meta) => {
      history.push({
        pathname: `${VIEW_ORG_DETAILS}${meta.id}`,
        search: location.search,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search],
  );

  const renderLastMenu = useCallback(() => <OrganizationsListLastMenu />, []);

  return (
    <Paneset data-test-organizations-list>
      {isFiltersOpened && (
        <FiltersPane>
          <SingleSearchForm
            applySearch={applySearch}
            changeSearch={changeSearch}
            searchQuery={searchQuery}
            searchableIndexes={searchableIndexes}
            changeSearchIndex={changeIndex}
            selectedIndex={searchIndex}
            isLoading={isLoading}
            ariaLabelId="ui-organizations.search"
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
      )}

      <ResultsPane
        title={resultsPaneTitle}
        count={organizationsCount}
        renderLastMenu={renderLastMenu}
        toggleFiltersPane={toggleFilters}
        filters={!isFiltersOpened ? filters : undefined}
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
        path={`${VIEW_ORG_DETAILS}:id`}
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
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

OrganizationsList.defaultProps = {
  organizationsCount: 0,
  isLoading: false,
  organizations: [],
};

export default withRouter(OrganizationsList);
