import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Button,
  Icon,
  MultiColumnList,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

import {
  ADD_INTERFACE_URL,
  EDIT_INTERFACE_URL,
  VIEW_INTERFACE_URL,
} from '../../../interfaces/constants';
import {
  columnMapping,
  visibleColumns,
} from './constants';

const getInterfaceUrl = (orgId, interfaceId) => {
  const ending = interfaceId ? `/interface/${interfaceId}/${VIEW_INTERFACE_URL}` : `/interface/${EDIT_INTERFACE_URL}`;
  const starting = orgId ? `/organizations/${orgId}` : '/organizations';

  return `${starting}${ending}`;
};

const AddInterfaceButton = ({ fetchInterfaces, fields, orgId }) => {
  const addInterfaces = (interfaces = []) => {
    const addedInterfacesIds = new Set(fields.getAll());
    const newInterface = interfaces.filter(({ id }) => !addedInterfacesIds.has(id));

    if (newInterface.length) {
      const interfaceIds = newInterface.map(inface => inface.id);

      fetchInterfaces([...addedInterfacesIds, ...interfaceIds]);
      interfaceIds.forEach(id => fields.push(id));
    }
  };

  const renderNewInterfaceBtn = () => {
    const url = `/organizations${orgId ? '/' + orgId : ''}/interface/${ADD_INTERFACE_URL}`;

    return (
      <Button
        marginBottom0
        buttonStyle="primary"
        to={url}
      >
        <FormattedMessage id="ui-organizations.interface.newInterface" />
      </Button>
    );
  };

  return (
    <Pluggable
      aria-haspopup="true"
      type="find-interface"
      searchLabel={<FormattedMessage id="ui-organizations.interface.addInterface" />}
      searchButtonStyle="default"
      disableRecordCreation
      addInterfaces={addInterfaces}
      renderNewInterfaceBtn={renderNewInterfaceBtn}
    >
      <span data-test-add-interface>
        <FormattedMessage id="ui-organizations.interface.noFindInterfacePlugin" />
      </span>
    </Pluggable>
  );
};

AddInterfaceButton.propTypes = {
  fetchInterfaces: PropTypes.func.isRequired,
  fields: PropTypes.object,
  orgId: PropTypes.string,
};

const OrganizationInterfacesList = ({ fetchInterfaces, fields, interfaces, orgId }) => {
  const contentData = fields.getAll().map((interfaceId, _index) => ({
    ...get(interfaces, interfaceId, {}),
    _index,
  }));

  const anchoredRowFormatter = (row) => {
    return (
      <div role="listitem" key={`row-${row.rowIndex}`}>
        <Link
          to={getInterfaceUrl(orgId, row.rowData.id)}
          className={row.rowClass}
          {...row.rowProps}
        >
          {row.cells}
        </Link>
      </div>
    );
  };

  const resultsFormatter = {
    name: ({ name }) => name,
    url: ({ uri }) => uri,
    unassign: (item) => (
      <Button
        align="end"
        buttonStyle="fieldControl"
        data-test-unassign-interface
        type="button"
        onClick={(e) => {
          e.preventDefault();
          fields.remove(item._index);
        }}
      >
        <Icon icon="times-circle" />
      </Button>
    ),
  };

  return (
    <React.Fragment>
      <MultiColumnList
        id="interface-list"
        columnMapping={columnMapping}
        contentData={contentData}
        formatter={resultsFormatter}
        rowFormatter={anchoredRowFormatter}
        visibleColumns={visibleColumns}
      />
      <br />
      <AddInterfaceButton
        fetchInterfaces={fetchInterfaces}
        fields={fields}
        orgId={orgId}
      />
    </React.Fragment>
  );
};

OrganizationInterfacesList.propTypes = {
  fetchInterfaces: PropTypes.func.isRequired,
  fields: PropTypes.object,
  orgId: PropTypes.string,
  interfaces: PropTypes.object,
};

export default OrganizationInterfacesList;
