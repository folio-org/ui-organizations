import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
// Folio
import { SearchAndSort } from '@folio/stripes/smart-components';
import { filters2cql } from '@folio/stripes/components';
import FormatTime from '../Utils/FormatTime';
import packageInfo from '../../package';
// Components and Pages
import { ORGANIZATIONS_API } from '../common/constants';
import { categoriesResource, baseContactsResource } from '../common/resources';
import PaneDetails from '../PaneDetails';
import { ViewVendor } from '../VendorViews';
import { Filters, SearchableIndexes } from '../Utils/FilterConfig';
import languageList from '../Utils/Languages';
import countryList from '../Utils/Country';
import phoneTypesList from '../Utils/PhoneTypes';
import './Main.css';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const filterConfig = Filters();
const searchableIndexes = SearchableIndexes;

class Main extends Component {
  static propTypes = {
    mutator: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.object,
    onSelectRow: PropTypes.func,
    onComponentWillUnmount: PropTypes.func,
    visibleColumns: PropTypes.arrayOf(PropTypes.string),
    disableRecordCreation: PropTypes.bool,
    showSingleResult: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    browseOnly: PropTypes.bool,
    packageInfo: PropTypes.object,
  };

  static defaultProps = {
    showSingleResult: true,
    browseOnly: false,
  };

  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'Name'
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      clear: true,
      records: 'organizations',
      recordsRequired: '%{resultCount}',
      path: ORGANIZATIONS_API,
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: (...args) => {
            /*
              This code is not DRY as it is copied from makeQueryFunction in stripes-components.
              This is necessary, as makeQueryFunction only referneces query paramaters as a data source.
              STRIPES-480 is intended to correct this and allow this query function to be replace with a call
              to makeQueryFunction.
              https://issues.folio.org/browse/STRIPES-480
            */
            const resourceData = args[2];
            const sortMap = {
              Name: 'name',
              Code: 'code',
              Description: 'description',
              Status: 'status',
            };

            const index = resourceData.query.qindex ? resourceData.query.qindex : 'all';
            const searchableIndex = searchableIndexes.find(idx => idx.value === index);

            let cql = searchableIndex.makeQuery(resourceData.query.query || '');
            const filterCql = filters2cql(filterConfig, resourceData.query.filters);
            if (filterCql) {
              if (cql) {
                cql = `(${cql}) and ${filterCql}`;
              } else {
                cql = filterCql;
              }
            }

            const { sort } = resourceData.query;
            if (sort) {
              const sortIndexes = sort.split(',').map((sort1) => {
                let reverse = false;
                if (sort1.startsWith('-')) {
                  // eslint-disable-next-line no-param-reassign
                  sort1 = sort1.substr(1);
                  reverse = true;
                }
                let sortIndex = sortMap[sort1] || sort1;
                if (reverse) {
                  sortIndex = `${sortIndex.replace(' ', '/sort.descending ')}/sort.descending`;
                }
                return sortIndex;
              });

              cql += ` sortby ${sortIndexes.join(' ')}`;
            }
            return cql;
          },
        },
        staticFallback: { params: {} },
      },
    },
    vendorCategory: categoriesResource,
    queryCustom: {
      initialValue: {
        vendorIDQuery: 'query=(name=null)',
        contactIDs: 'query=(id=null)',
      }
    },
    vendorID: {
      type: 'okapi',
      records: 'organizations',
      path: ORGANIZATIONS_API,
      params: {
        query: (...args) => {
          const newData = `${args[2].queryCustom.vendorIDQuery}`;
          const cql = `${newData} sortby id`;
          return cql;
        },
      }
    },
    contacts: {
      ...baseContactsResource,
      params: {
        query: (...args) => {
          // const newData = 'query=(id="d375f933-a093-4348-a594-0c02442946f3*")';
          const newData = `${args[2].queryCustom.contactIDs}`;
          const cql = `${newData} sortby id`;
          return cql;
        },
      }
    },

    dropdown: {
      initialValue: {
        paymentMethodDD: [
          { label: 'Cash', value: 'Cash' },
          { label: 'Credit Card/P-Card', value: 'Credit Card P Card' },
          { label: 'EFT', value: 'EFT' },
          { label: 'Deposit Account', value: 'Deposit Account' },
          { label: 'Physical Check', value: 'Physical Check' },
          { label: 'Bank Draft', value: 'Bank Draft' },
          { label: 'Internal Transfer', value: 'Internal Transfer' },
          { label: 'Other', value: 'other' },
        ],
        vendorEdiCodeDD: [
          { label: 'Code', value: 'code' },
        ],
        ediCodeTypeDD: [
          { label: '31B (US-SAN)', value: '31B/US-SAN' },
          { label: '014 (EAN)', value: '014/EAN' },
          { label: '091 (Supplier-assigned ID)', value: '091/Vendor-assigned' },
          { label: '092 (Library-assigned ID)', value: '092/Customer-assigned' }
        ],
        libraryEDICodeDD: [
          { label: 'Code', value: 'code' },
        ],
        ftpDD: [
          { label: 'SFTP', value: 'SFTP' },
          { label: 'FTP', value: 'FTP' },
        ],
        transmissionModeDD: [
          { label: 'ASCII', value: 'ASCII' },
          { label: 'Binary', value: 'Binary' },
        ],
        connectionModeDD: [
          { label: 'Active', value: 'Active' },
          { label: 'Passive', value: 'Passive' },
        ],
        deliveryMethodDD: [
          { label: 'Online', value: 'Online' },
          { label: 'FTP', value: 'FTP' },
          { label: 'Email', value: 'Email' },
          { label: 'Other', value: 'Other' },
        ],
        formatDD: [
          { label: 'Counter', value: 'Counter' },
          { label: 'Delimited', value: 'delimited' },
          { label: 'Excel', value: 'excel' },
          { label: 'PDF', value: 'pdf' },
          { label: 'ASCII', value: 'ascii' },
          { label: 'HTML', value: 'html' },
          { label: 'Other', value: 'other' },
        ],
        statusDD: [
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' },
          { label: 'Pending', value: 'Pending' },
        ],
        currencyDD: ['USD', 'CAD', 'GBP', 'EUR'],
        phoneTypesList,
        countryList,
        languageList,
      }
    }
  });

  static getDerivedStateFromProps(props) {
    const langFilter = filterConfig.find(group => group.name === 'language');
    const countryFilter = filterConfig.find(group => group.name === 'country');
    if (langFilter.values.length === 0 && countryFilter.values.length === 0) {
      langFilter.values = languageList.map(({ label, value }) => ({ name: label, cql: value }));
      countryFilter.values = countryList.map(({ label, value }) => ({ name: label, cql: value }));
      props.mutator.initializedFilterConfig.replace(true);
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  create = (data) => {
    const { mutator } = this.props;
    // Convert time
    const time = FormatTime(data, 'post');
    if (time) { data.edi.ediJob.time = time; }

    // TODO: remove me when interfaces are done
    data.interfaces = undefined;

    mutator.records.POST(data).then(newLedger => {
      mutator.query.update({
        _path: `/organizations/view/${newLedger.id}`,
        layer: null
      });
    });
  };

  onChangeIndex = (e) => {
    const qindex = e.target.value;
    this.props.mutator.query.update({ qindex });
  };

  render() {
    const { onSelectRow, disableRecordCreation, onComponentWillUnmount, showSingleResult, browseOnly } = this.props;
    const resultsFormatter = {
      'Name': data => _.get(data, ['name'], ''),
      'Code': data => _.get(data, ['code'], ''),
      'Description': data => _.get(data, ['description'], ''),
      'Status': data => _.toString(_.get(data, ['status'], ''))
    };
    const columnMapping = {
      'Name': <FormattedMessage id="ui-organizations.main.name" />,
      'Code': <FormattedMessage id="ui-organizations.main.code" />,
      'Description': <FormattedMessage id="ui-organizations.main.description" />,
      'Status': <FormattedMessage id="ui-organizations.main.vendorStatus" />
    };

    return (
      <div data-test-organizations-list>
        <SearchAndSort
          packageInfo={this.props.packageInfo || packageInfo}
          objectName="organization"
          baseRoute={packageInfo.stripes.route}
          filterConfig={filterConfig}
          visibleColumns={this.props.visibleColumns ? this.props.visibleColumns : ['Name', 'Code', 'Description', 'Status']}
          columnMapping={columnMapping}
          resultsFormatter={resultsFormatter}
          viewRecordComponent={ViewVendor}
          onCreate={this.create}
          editRecordComponent={PaneDetails}
          newRecordInitialValues={{ contacts: [] }}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          finishedResourceName="perms"
          viewRecordPerms="organizations-storage.organizations.item.get"
          newRecordPerms="organizations-storage.organizations.item.post,login.item.post"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          detailProps={this.props.stripes}
          stripes={this.stripes}
          searchableIndexes={searchableIndexes}
          selectedIndex={_.get(this.props.resources.query, 'qindex')}
          searchableIndexesPlaceholder={null}
          onChangeIndex={this.onChangeIndex}
          onSelectRow={onSelectRow}
          disableRecordCreation={disableRecordCreation}
          onComponentWillUnmount={onComponentWillUnmount}
          browseOnly={browseOnly}
          showSingleResult={showSingleResult}
        />
      </div>
    );
  }
}

export default Main;
