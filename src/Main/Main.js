import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import {
  get,
  toString,
} from 'lodash';
// Folio
import { SearchAndSort, makeQueryFunction } from '@folio/stripes/smart-components';
import { Callout } from '@folio/stripes/components';
import {
  getActiveFilters,
  handleFilterChange,
  changeSearchIndex,
  showToast,
} from '@folio/stripes-acq-components';

import FormatTime from '../Utils/FormatTime';
import packageInfo from '../../package';
// Components and Pages
import {
  ORGANIZATIONS_API,
  DICT_CATEGORIES,
} from '../common/constants';
import {
  categoriesResource,
  baseContactsResource,
  interfacesResource,
} from '../common/resources';
import PaneDetails from '../PaneDetails';
import { ViewVendor } from '../VendorViews';
import languageList from '../Utils/Languages';
import countryList from '../Utils/Country';
import phoneTypesList from '../Utils/PhoneTypes';

import OrganizationsFilter from './OrganizationsFilter';
import { filterConfig } from './OrganizationsFilterConfig';
import {
  organizationsSearchQueryTemplate,
  searchableIndexes,
} from './OrganizationsSearchConfig';
import './Main.css';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const getHelperResourcePath = (helper, id) => `${ORGANIZATIONS_API}/${id}`;

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
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    showSingleResult: true,
    browseOnly: false,
  };

  static manifest = Object.freeze({
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'Name',
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
          query: makeQueryFunction(
            'cql.allRecords=1',
            organizationsSearchQueryTemplate,
            {
              Name: 'name',
              Code: 'code',
              Description: 'description',
              Status: 'status',
            },
            filterConfig,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    [DICT_CATEGORIES]: categoriesResource,
    queryCustom: {
      initialValue: {
        vendorIDQuery: 'query=(name=null)',
        contactIDs: 'query=(id=null)',
        interfaceIDs: 'query=(id=null)',
      },
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
      },
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
      },
    },
    contactsManualFetch: {
      ...baseContactsResource,
      fetch: false,
      accumulate: true,
    },
    interfaces: {
      ...interfacesResource,
      params: {
        query: (...args) => {
          const newData = `${args[2].queryCustom.interfaceIDs}`;
          const cql = `${newData} sortby id`;

          return cql;
        },
      },
    },
    dropdown: {
      initialValue: {
        vendorEdiCodeDD: [
          { label: 'Code', value: 'code' },
        ],
        ediCodeTypeDD: [
          { label: '31B (US-SAN)', value: '31B/US-SAN' },
          { label: '014 (EAN)', value: '014/EAN' },
          { label: '091 (Supplier-assigned ID)', value: '091/Vendor-assigned' },
          { label: '092 (Library-assigned ID)', value: '092/Customer-assigned' },
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
        phoneTypesList,
        countryList,
        languageList,
      },
    },
  });

  constructor(props, context) {
    super(props, context);
    this.state = {};

    this.getActiveFilters = getActiveFilters.bind(this);
    this.handleFilterChange = handleFilterChange.bind(this);
    this.changeSearchIndex = changeSearchIndex.bind(this);
    this.callout = React.createRef();
    this.showToast = showToast.bind(this);
  }

  create = (data) => {
    const { mutator } = this.props;
    // Convert time
    const time = FormatTime(data, 'post');

    if (time) { data.edi.ediJob.time = time; }

    mutator.records.POST(data).then(newOrganization => {
      mutator.query.update({
        _path: `/organizations/view/${newOrganization.id}`,
        layer: null,
      });
    });
  };

  getTranslateSearchableIndexes = () => {
    const { intl: { formatMessage } } = this.props;

    return searchableIndexes.map(index => {
      const label = formatMessage({ id: `ui-organizations.search.${index.label}` });

      return { ...index, label };
    });
  };

  renderFilters = (onChange) => {
    return (
      <OrganizationsFilter
        activeFilters={this.getActiveFilters()}
        onChange={onChange}
      />
    );
  };

  render() {
    const {
      browseOnly,
      disableRecordCreation,
      mutator,
      onComponentWillUnmount,
      onSelectRow,
      resources,
      showSingleResult,
      stripes,
      visibleColumns,
    } = this.props;
    const resultsFormatter = {
      'Name': data => get(data, ['name'], ''),
      'Code': data => get(data, ['code'], ''),
      'Description': data => get(data, ['description'], ''),
      'Status': data => toString(get(data, ['status'], '')),
      'isVendor': ({ isVendor }) => <FormattedMessage id={`ui-organizations.main.isVendor.${isVendor ? 'yes' : 'no'}`} />,
    };
    const columnMapping = {
      'Name': <FormattedMessage id="ui-organizations.main.name" />,
      'Code': <FormattedMessage id="ui-organizations.main.code" />,
      'Description': <FormattedMessage id="ui-organizations.main.description" />,
      'Status': <FormattedMessage id="ui-organizations.main.vendorStatus" />,
      'isVendor': <FormattedMessage id="ui-organizations.main.isVendor" />,
    };

    return (
      <div data-test-organizations-list>
        <SearchAndSort
          packageInfo={this.props.packageInfo || packageInfo}
          objectName="organization"
          baseRoute={packageInfo.stripes.route}
          visibleColumns={visibleColumns || ['Name', 'Code', 'Description', 'Status', 'isVendor']}
          columnMapping={columnMapping}
          resultsFormatter={resultsFormatter}
          viewRecordComponent={ViewVendor}
          onCreate={this.create}
          editRecordComponent={PaneDetails}
          newRecordInitialValues={{ contacts: [], interfaces: [] }}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          finishedResourceName="perms"
          viewRecordPerms="ui-organizations.basic.view"
          newRecordPerms="ui-organizations.create"
          parentResources={resources}
          parentMutator={mutator}
          detailProps={{ showToast: this.showToast }}
          stripes={stripes}
          searchableIndexes={this.getTranslateSearchableIndexes()}
          selectedIndex={get(resources.query, 'qindex')}
          searchableIndexesPlaceholder={null}
          onChangeIndex={this.changeSearchIndex}
          onSelectRow={onSelectRow}
          disableRecordCreation={disableRecordCreation}
          onComponentWillUnmount={onComponentWillUnmount}
          browseOnly={browseOnly}
          showSingleResult={showSingleResult}
          renderFilters={this.renderFilters}
          onFilterChange={this.handleFilterChange}
          getHelperResourcePath={getHelperResourcePath}
        />
        <Callout ref={this.callout} />
      </div>
    );
  }
}

export default injectIntl(Main);
