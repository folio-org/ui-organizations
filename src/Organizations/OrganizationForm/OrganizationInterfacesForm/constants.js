import React from 'react';
import { FormattedMessage } from 'react-intl';

export const columnMapping = {
  interfaceName: <FormattedMessage id="ui-organizations.interface.name" />,
  interfaceUrl: <FormattedMessage id="ui-organizations.interface.url" />,
  unassignInterface: null,
};

export const visibleColumns = ['interfaceName', 'interfaceUrl', 'unassignInterface'];
