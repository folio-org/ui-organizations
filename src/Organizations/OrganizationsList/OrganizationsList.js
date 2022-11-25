import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  checkScope,
  HasCommand,
  MultiColumnList,
} from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';
import { PersistedPaneset } from '@folio/stripes/smart-components';
import {
  RESULT_COUNT_INCREMENT,
  FiltersPane,
  handleKeyCommand,
  NoResultsMessage,
  ResetButton,
  ResultsPane,
  SingleSearchForm,
  PrevNextPagination,
  useFiltersReset,
  useFiltersToogle,
  useItemToView,
  useLocationFilters,
  useLocationSorting,
} from '@folio/stripes-acq-components';

import {
  ORGANIZATIONS_ROUTE,
  VIEW_ORG_DETAILS,
} from '../../common/constants';
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
  isLoading,
  onNeedMoreData,
  resetData,
  organizations,
  organizationsCount,
  refreshList,
  resultsPaneTitleRef,
  pagination,
}) => {
  const stripes = useStripes();
  const history = useHistory();
  const location = useLocation();
  const isDetailsPaneInFocus = location.state?.isDetailsPaneInFocus;
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

  useFiltersReset(resetFilters);

  const { isFiltersOpened, toggleFilters } = useFiltersToogle('ui-organizations/filters');

  const openOrganizationDetails = useCallback(
    (e, meta) => {
      history.push({
        pathname: `${VIEW_ORG_DETAILS}${meta.id}`,
        search: location.search,
        state: { isDetailsPaneInFocus: true },
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

  const shortcuts = [
    {
      name: 'new',
      handler: handleKeyCommand(() => {
        if (stripes.hasPerm('ui-organizations.create')) {
          history.push(`${ORGANIZATIONS_ROUTE}/create`);
        }
      }),
    },
  ];

  const { itemToView, setItemToView, deleteItemToView } = useItemToView('organizations-list');

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <PersistedPaneset
        appId="ui-organizations"
        id="organizations-paneset"
        data-test-organizations-list
      >
        {isFiltersOpened && (
          <FiltersPane
            id="organizations-filters-pane"
            toggleFilters={toggleFilters}
          >
            <SingleSearchForm
              applySearch={applySearch}
              autoFocus={!isDetailsPaneInFocus}
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
          id="organizations-results-pane"
          autosize
          title={resultsPaneTitle}
          count={organizationsCount}
          renderLastMenu={renderLastMenu}
          toggleFiltersPane={toggleFilters}
          filters={filters}
          isFiltersOpened={isFiltersOpened}
          resultsPaneTitleRef={resultsPaneTitleRef}
          isLoading={isLoading}
        >
          {({ height, width }) => (
            <>
              <MultiColumnList
                id="organizations-list"
                totalCount={organizationsCount}
                contentData={organizations}
                visibleColumns={visibleColumns}
                columnMapping={columnMapping}
                formatter={resultsFormatter}
                loading={isLoading}
                onNeedMoreData={onNeedMoreData}
                sortOrder={sortingField}
                sortDirection={sortingDirection}
                onHeaderClick={changeSorting}
                onRowClick={openOrganizationDetails}
                isEmptyMessage={resultsStatusMessage}
                pagingType="none"
                hasMargin
                pageAmount={RESULT_COUNT_INCREMENT}
                height={height - PrevNextPagination.HEIGHT}
                width={width}
                itemToView={itemToView}
                onMarkPosition={setItemToView}
                onResetMark={deleteItemToView}
              />
              {organizations.length > 0 && (
                <PrevNextPagination
                  {...pagination}
                  totalCount={organizationsCount}
                  disabled={isLoading}
                  onChange={onNeedMoreData}
                />
              )}
            </>
          )}
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
      </PersistedPaneset>
    </HasCommand>
  );
};

OrganizationsList.propTypes = {
  onNeedMoreData: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  organizationsCount: PropTypes.number,
  isLoading: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.object),
  refreshList: PropTypes.func.isRequired,
  resultsPaneTitleRef: PropTypes.object,
  pagination: PropTypes.object,
};

OrganizationsList.defaultProps = {
  organizationsCount: 0,
  isLoading: false,
  organizations: [],
};

export default OrganizationsList;
