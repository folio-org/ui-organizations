import PropTypes from 'prop-types';
import {
  useContext,
  useMemo,
} from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  NoValue,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  LANG_LABEL_BY_CODE,
  VersionCheckbox,
  VersionKeyValue,
  VersionViewContext,
} from '@folio/stripes-acq-components';

import { ORGANIZATION_SECTIONS } from '../../../constants';

export const OrganizationSummaryVersionView = ({ version }) => {
  const versionContext = useContext(VersionViewContext);

  const changedFieldNameSet = useMemo(() => new Set(versionContext?.paths), [versionContext?.paths]);

  return (
    <>
      <Row>
        <Col xs={12}>
          {version?.metadata && (
            <ViewMetaData
              id={`${ORGANIZATION_SECTIONS.summarySection}.metadata`}
              metadata={version?.metadata}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <VersionKeyValue
            name="name"
            label={<FormattedMessage id="ui-organizations.summary.name" />}
            value={version?.name}
          />
        </Col>

        <Col xs={3}>
          <VersionKeyValue
            name="code"
            label={<FormattedMessage id="ui-organizations.summary.code" />}
            value={version?.code}
          />
        </Col>

        <Col xs={3}>
          <VersionKeyValue
            name="erpCode"
            label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
            value={version?.erpCode || <NoValue />}
          />
        </Col>

        <Col xs={3}>
          <VersionKeyValue
            name="status"
            label={<FormattedMessage id="ui-organizations.summary.organizationStatus" />}
            value={version?.status && <FormattedMessage id={`ui-organizations.organizationStatus.${version.status.toLowerCase()}`} />}
          />
        </Col>

        <Col xs={3}>
          <VersionKeyValue
            name="language"
            label={<FormattedMessage id="ui-organizations.summary.defaultLanguage" />}
            value={LANG_LABEL_BY_CODE[version?.language] || version?.language || <NoValue />}
          />
        </Col>

        <Col xs={3}>
          <VersionKeyValue
            name="organizationTypes"
            label={<FormattedMessage id="ui-organizations.summary.type" />}
            value={version?.organizationTypesResolved || <NoValue />}
            multiple
          />
        </Col>

        <Col xs={3}>
          <VersionKeyValue
            name="acqUnitIds"
            label={<FormattedMessage id="stripes-acq-components.label.acqUnits" />}
            value={version?.acqUnits}
            multiple
          />
        </Col>

        <Col xs={3}>
          <VersionKeyValue
            name="description"
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            value={version?.description || <NoValue />}
          />
        </Col>

        <Col xs={3}>
          <VersionCheckbox
            name="isDonor"
            checked={version?.isDonor}
            label={<FormattedMessage id="ui-organizations.summary.isDonor" />}
          />
        </Col>

        <Col xs={3}>
          <VersionCheckbox
            name="isVendor"
            checked={version?.isVendor}
            label={<FormattedMessage id="ui-organizations.summary.isVendor" />}
          />
        </Col>

        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-organizations.summary.alternativeNames" />}>
            {
              version?.aliases?.map(({ value }, indx, arr) => {
                const displayValue = changedFieldNameSet.has(`aliases[${indx}].value`) ? <mark>{value}</mark> : value;

                return <>{displayValue}{indx !== arr.length - 1 && ', '}</>;
              })
            }
          </KeyValue>
        </Col>
      </Row>
    </>
  );
};

OrganizationSummaryVersionView.propTypes = {
  version: PropTypes.object,
};
