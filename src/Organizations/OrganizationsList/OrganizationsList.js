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
  NoResultsMessage,
  ResetButton,
  ResultsPane,
  SingleSearchForm,
  useLocationFilters,
  useLocationSorting,
  useToggle,
} from '@folio/stripes-acq-components';

import { RESULT_COUNT_INCREMENT } from '../../common/resources';
import { VIEW_ORG_DETAILS } from '../../common/constants';
import { OrganizationDetailsContainer } from '../OrganizationDetails';
import OrganizationsListFilter from './OrganizationsListFilter';
import {
  searchableIndexes,
} from './OrganizationsListSearchConfig';
import OrganizationsListLastMenu from './OrganizationsListLastMenu';

const resultsPaneTitle = <FormattedMessage id="ui-organizations.meta.title" />;
const visibleColumns = ['orgName', 'orgCode', 'orgDescription', 'orgStatus', 'isVendor'];
const sortableFields = ['orgName', 'orgCode', 'orgDescription', 'orgStatus', 'isVendor'];
const columnMapping = {
  orgName: <FormattedMessage id="ui-organizations.main.name" />,
  orgCode: <FormattedMessage id="ui-organizations.main.code" />,
  orgDescription: <FormattedMessage id="ui-organizations.main.description" />,
  orgStatus: <FormattedMessage id="ui-organizations.main.vendorStatus" />,
  isVendor: <FormattedMessage id="ui-organizations.main.isVendor" />,
};
const resultsFormatter = {
  orgName: ({ name }) => name,
  orgCode: ({ code }) => code,
  orgDescription: ({ description }) => description,
  orgStatus: data => <FormattedMessage id={`ui-organizations.organizationStatus.${data.status.toLowerCase()}`} />,
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
  refreshList,
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
  const resultsStatusMessage = (
    <NoResultsMessage
      isLoading={isLoading}
      filters={filters}
      isFiltersOpened={isFiltersOpened}
      toggleFilters={toggleFilters}
    />
  );

  return (
    <Paneset data-test-organizations-list>
      {isFiltersOpened && (
        <FiltersPane toggleFilters={toggleFilters}>
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
            disabled={!location.search || isLoading}
          />

          <OrganizationsListFilter
            activeFilters={filters}
            applyFilters={applyFilters}
            disabled={isLoading}
          />
        </FiltersPane>
      )}

      <ResultsPane
        title={resultsPaneTitle}
        count={organizationsCount}
        renderLastMenu={renderLastMenu}
        toggleFiltersPane={toggleFilters}
        filters={filters}
        isFiltersOpened={isFiltersOpened}
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
          isEmptyMessage={resultsStatusMessage}
          pagingType="click"
          hasMargin
          pageAmount={RESULT_COUNT_INCREMENT}
        />
      </ResultsPane>

      <Route
        path={`${VIEW_ORG_DETAILS}:id`}
        render={props => (
          <OrganizationDetailsContainer
            {...props}
            refreshList={refreshList}
          />
        )}
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
  refreshList: PropTypes.func.isRequired,
};

OrganizationsList.defaultProps = {
  organizationsCount: 0,
  isLoading: false,
  organizations: [],
};

export default withRouter(OrganizationsList);
