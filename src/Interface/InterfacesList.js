import React from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';
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
} from '../interfaces/constants';
import {
  columnMapping,
  columnWidths,
  visibleColumns,
} from './constants';

const getInterfaceUrl = (orgId, interfaceId) => {
  const ending = interfaceId ? `/interface/${interfaceId}/${VIEW_INTERFACE_URL}` : `/interface/${EDIT_INTERFACE_URL}`;
  const starting = orgId ? `/organizations/${orgId}` : '/organizations';

  return `${starting}${ending}`;
};

const AddInterfaceButton = ({ fetchInterfaces, fields, stripes, orgId }) => {
  const addInterface = (interfaces = []) => {
    const addedInterfacesIds = new Set(fields.getAll());
    const newInterface = interfaces.filter(({ id }) => !addedInterfacesIds.has(id));
    if (newInterface.length) {
      fields.push(...map(newInterface, 'id'));
      fetchInterfaces();
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
      dataKey="interface"
      searchLabel={<FormattedMessage id="ui-organizations.interface.addInterface" />}
      searchButtonStyle="default"
      disableRecordCreation
      stripes={stripes}
      addInterface={addInterface}
      renderNewContactBtn={renderNewInterfaceBtn}
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
  stripes: PropTypes.object,
  orgId: PropTypes.string,
};

const InterfacesList = ({ fetchInterfaces, fields, interfaces, orgId, stripes }) => {
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
        columnWidths={columnWidths}
        contentData={contentData}
        formatter={resultsFormatter}
        rowFormatter={anchoredRowFormatter}
        visibleColumns={visibleColumns}
      />
      <br />
      <AddInterfaceButton
        fetchInterfaces={fetchInterfaces}
        fields={fields}
        stripes={stripes}
        orgId={orgId}
      />
    </React.Fragment>
  );
};

InterfacesList.propTypes = {
  fetchInterfaces: PropTypes.func.isRequired,
  fields: PropTypes.object,
  orgId: PropTypes.string,
  interfaces: PropTypes.object,
  stripes: PropTypes.object,
};

export default InterfacesList;
