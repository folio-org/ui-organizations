import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Checkbox,
  Col,
  KeyValue,
  MultiColumnList,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  AcqUnitsView,
  LANG_LABEL_BY_CODE,
} from '@folio/stripes-acq-components';

const aliasesColumnMapping = {
  value: <FormattedMessage id="ui-organizations.summary.alias" />,
  description: <FormattedMessage id="ui-organizations.summary.description" />,
};

const OrganizationSummary = ({
  acqUnitIds,
  aliases,
  code,
  description,
  erpCode,
  isVendor,
  language,
  metadata,
  name,
  status,
}) => {
  return (
    <>
      <Row>
        <Col xs={12}>
          {metadata && <ViewMetaData metadata={metadata} />}
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.name" />}
            value={name}
          />
        </Col>

        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.code" />}
            value={code}
          />
        </Col>

        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
            value={erpCode}
          />
        </Col>

        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.organizationStatus" />}
          >
            {status && <FormattedMessage id={`ui-organizations.organizationStatus.${status.toLowerCase()}`} />}
          </KeyValue>
        </Col>

        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.defaultLanguage" />}
            value={LANG_LABEL_BY_CODE[language] || language}
          />
        </Col>

        <Col xs={4}>
          <Checkbox
            checked={isVendor}
            disabled
            label={<FormattedMessage id="ui-organizations.summary.isVendor" />}
            vertical
          />
        </Col>

        <Col xs={4}>
          <AcqUnitsView units={acqUnitIds} />
        </Col>

        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            value={description}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.alternativeNames" />}
          >
            <MultiColumnList
              contentData={aliases}
              columnMapping={aliasesColumnMapping}
            />
          </KeyValue>
        </Col>
      </Row>
    </>
  );
};

OrganizationSummary.propTypes = {
  acqUnitIds: PropTypes.arrayOf(PropTypes.string),
  aliases: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
  })),
  code: PropTypes.string,
  description: PropTypes.string,
  erpCode: PropTypes.string,
  isVendor: PropTypes.bool,
  language: PropTypes.string,
  metadata: PropTypes.object,
  name: PropTypes.string,
  status: PropTypes.string,
};

OrganizationSummary.defaultProps = {
  aliases: [],
  isVendor: false,
};

export default OrganizationSummary;
