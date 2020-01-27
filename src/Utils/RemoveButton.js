import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Button } from '@folio/stripes/components';

const RemoveButton = (fields, index, id, label) => {
  return (
    <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
      <Button onClick={() => fields.remove(index)} buttonStyle="danger">
        <FormattedMessage id={label} />
      </Button>
    </Col>
  );
};

export default RemoveButton;
