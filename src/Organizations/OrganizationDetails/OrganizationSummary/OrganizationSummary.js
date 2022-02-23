import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Checkbox,
  Col,
  KeyValue,
  MultiColumnList,
  NoValue,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  AcqUnitsView,
  LANG_LABEL_BY_CODE,
} from '@folio/stripes-acq-components';

import { ORGANIZATION_SECTIONS } from '../../constants';

const aliasesColumnMapping = {
  value: <FormattedMessage id="ui-organizations.summary.alias" />,
  description: <FormattedMessage id="ui-organizations.summary.description" />,
};
const aliasesVisibleColumns = ['value', 'description'];

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
  initialOrganizationTypes,
}) => {
  const defaultLanguageValue = LANG_LABEL_BY_CODE[language] || language;

  return (
    <>
      <Row>
        <Col xs={12}>
          {metadata && (
            <ViewMetaData
              id={`${ORGANIZATION_SECTIONS.summarySection}.metadata`}
              metadata={metadata}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <KeyValue
            data-testid="name"
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
            data-testid="accountingCode"
            label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
            value={erpCode || <NoValue />}
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
            data-testid="defaultLanguage"
            label={<FormattedMessage id="ui-organizations.summary.defaultLanguage" />}
            value={defaultLanguageValue || <NoValue />}
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
          <KeyValue
            data-testid="type"
            label={<FormattedMessage id="ui-organizations.summary.type" />}
            value={initialOrganizationTypes.join(', ') || <NoValue />}
          />
        </Col>

        <Col xs={4}>
          <AcqUnitsView units={acqUnitIds} />
        </Col>

        <Col xs={12}>
          <KeyValue
            data-testid="description"
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            value={description || <NoValue />}
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
              interactive={false}
              visibleColumns={aliasesVisibleColumns}
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
  initialOrganizationTypes: PropTypes.arrayOf(PropTypes.string),
};

OrganizationSummary.defaultProps = {
  aliases: [],
  isVendor: false,
};

export default OrganizationSummary;
