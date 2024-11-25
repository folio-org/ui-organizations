import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  MultiColumnList,
  NoValue,
  Row,
  TextLink,
} from '@folio/stripes/components';

import { useVersionWrappedRowFormatter } from '../../../../common/hooks';

const columnMapping = {
  interfaceName: <FormattedMessage id="ui-organizations.interface.name" />,
  interfaceUrl: <FormattedMessage id="ui-organizations.interface.url" />,
};

const visibleColumns = ['interfaceName', 'interfaceUrl'];

const resultsFormatter = {
  interfaceName: ({ name }) => name,
  interfaceUrl: (item) => (
    item.uri
      ? (
        <TextLink
          rel="noopener noreferrer"
          target="_blank"
          href={item.uri}
        >
          {item.uri}
        </TextLink>
      )
      : <NoValue />
  ),
};

export const OrganizationInterfacesVersionView = ({
  name,
  version,
}) => {
  const rowFormatter = useVersionWrappedRowFormatter({ name });

  return (
    <Row>
      <Col xs={12}>
        <MultiColumnList
          id="interface-list"
          columnMapping={columnMapping}
          contentData={version?.interfacesList}
          formatter={resultsFormatter}
          rowFormatter={rowFormatter}
          visibleColumns={visibleColumns}
        />
      </Col>
    </Row>
  );
};

OrganizationInterfacesVersionView.propTypes = {
  name: PropTypes.string.isRequired,
  version: PropTypes.object,
};
