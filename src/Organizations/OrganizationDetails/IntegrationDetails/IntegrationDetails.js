import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

import {
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';

const visibleColumns = ['configName', 'configDescription'];
const columnMapping = {
  configName: <FormattedMessage id="ui-organizations.main.name" />,
  configDescription: <FormattedMessage id="ui-organizations.main.description" />,
};
const formatter = {
  configName: i => i.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.configName,
  configDescription: i => i.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.configDescription || <NoValue />,
};

const IntegrationDetails = ({ orgId, integrationConfigs = [] }) => {
  const history = useHistory();
  const location = useLocation();

  const openIntegrationView = useCallback(
    (e, { id }) => {
      history.push({
        pathname: `/organizations/${orgId}/integration/${id}/view`,
        search: location.search,
      });
    },
    [history, location.search, orgId],
  );

  return (
    <MultiColumnList
      id="list-integration-configs"
      contentData={integrationConfigs}
      visibleColumns={visibleColumns}
      columnMapping={columnMapping}
      formatter={formatter}
      onRowClick={openIntegrationView}
      interactive
    />
  );
};

IntegrationDetails.propTypes = {
  orgId: PropTypes.string.isRequired,
  integrationConfigs: PropTypes.arrayOf(PropTypes.object),
};

export default IntegrationDetails;
