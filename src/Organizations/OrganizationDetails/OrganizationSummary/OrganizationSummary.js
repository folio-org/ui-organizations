import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Checkbox,
  Col,
  KeyValue,
  NoValue,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  AcqUnitsView,
  LANG_LABEL_BY_CODE,
} from '@folio/stripes-acq-components';

import { ORGANIZATION_SECTIONS } from '../../constants';

const OrganizationSummary = ({
  acqUnitIds,
  aliases,
  code,
  description,
  erpCode,
  isVendor,
  isDonor,
  language,
  metadata,
  name,
  status,
  organizationTypes,
}) => {
  const defaultLanguageValue = LANG_LABEL_BY_CODE[language] || language;
  const alternativeNames = useMemo(() => aliases.map(({ value }) => value).join(', '), [aliases]);

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
        <Col xs={3}>
          <KeyValue
            data-testid="name"
            label={<FormattedMessage id="ui-organizations.summary.name" />}
            value={name}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.code" />}
            value={code}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            data-testid="accountingCode"
            label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
            value={erpCode || <NoValue />}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.organizationStatus" />}
          >
            {status && <FormattedMessage id={`ui-organizations.organizationStatus.${status.toLowerCase()}`} />}
          </KeyValue>
        </Col>

        <Col xs={3}>
          <KeyValue
            data-testid="defaultLanguage"
            label={<FormattedMessage id="ui-organizations.summary.defaultLanguage" />}
            value={defaultLanguageValue || <NoValue />}
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            data-testid="type"
            label={<FormattedMessage id="ui-organizations.summary.type" />}
            value={organizationTypes.join(', ') || <NoValue />}
          />
        </Col>

        <Col xs={3}>
          <AcqUnitsView units={acqUnitIds} />
        </Col>

        <Col xs={3}>
          <KeyValue
            data-testid="description"
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            value={description || <NoValue />}
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            checked={isDonor}
            disabled
            label={<FormattedMessage id="ui-organizations.summary.isDonor" />}
            vertical
          />
        </Col>

        <Col xs={3}>
          <Checkbox
            checked={isVendor}
            disabled
            label={<FormattedMessage id="ui-organizations.summary.isVendor" />}
            vertical
          />
        </Col>

        <Col xs={3}>
          <KeyValue
            data-testid="alternativeNames"
            label={<FormattedMessage id="ui-organizations.summary.alternativeNames" />}
            value={alternativeNames || <NoValue />}
          />
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
  isDonor: PropTypes.bool,
  language: PropTypes.string,
  metadata: PropTypes.object,
  name: PropTypes.string,
  status: PropTypes.string,
  organizationTypes: PropTypes.arrayOf(PropTypes.string),
};

OrganizationSummary.defaultProps = {
  aliases: [],
  isVendor: false,
  isDonor: false,
};

export default OrganizationSummary;
