import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';

const visibleColumns = ['name', 'description'];
const columnMapping = {
  name: <FormattedMessage id="ui-organizations.main.name" />,
  description: <FormattedMessage id="ui-organizations.main.description" />,
};
const formatter = {
  name: i => i.configName,
  description: i => i.configDescription || <NoValue />,
};

const IntegrationDetails = ({ integrationConfigs = [] }) => (
  <MultiColumnList
    id="list-integration-configs"
    contentData={integrationConfigs}
    visibleColumns={visibleColumns}
    columnMapping={columnMapping}
    formatter={formatter}
    interactive={false}
  />
);

IntegrationDetails.propTypes = {
  integrationConfigs: PropTypes.arrayOf(PropTypes.object),
};

export default IntegrationDetails;
