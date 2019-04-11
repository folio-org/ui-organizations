import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, KeyValue } from '@folio/stripes/components';
import BoolToCheckbox from './BoolToCheckbox';

const PrintKeyValue = (label, val, colNum, isRequire) => {
  return (
    <Col xs={colNum}>
      <KeyValue label={<FormattedMessage id={label} />} value={val} required={isRequire} />
    </Col>
  );
};

const PrintBoolToCheckbox = (label, val, colNum, isRequire) => {
  return (
    <Col xs={colNum}>
      <KeyValue label={<FormattedMessage id={label} />} required={isRequire}>
        <BoolToCheckbox value={val} />
      </KeyValue>
    </Col>
  );
};

export { PrintKeyValue, PrintBoolToCheckbox };
