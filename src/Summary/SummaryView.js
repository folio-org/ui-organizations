import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MultiColumnList, Row, Col, KeyValue } from '@folio/stripes/components';
import css from './SummaryView.css';
import LanguageLookup from '../Utils/LanguageLookup';

class SummaryView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues || [];
    const columnWidths = { 'value': '50%', 'description': '50%' };
    const columnMapping = {
      'value': <FormattedMessage id="ui-organizations.summary.alias" />,
      'description': <FormattedMessage id="ui-organizations.summary.description" />
    };
    const getLanguage = LanguageLookup(_.get(dataVal, 'language', ''));

    return (
      <Row>
        <Col xs={4}>
          <KeyValue label={<FormattedMessage id="ui-organizations.summary.name" />} value={_.get(dataVal, 'name', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label={<FormattedMessage id="ui-organizations.summary.code" />} value={_.get(dataVal, 'code', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label={<FormattedMessage id="ui-organizations.summary.accountingCode" />} value={_.get(dataVal, ['erp_code'], '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label={<FormattedMessage id="ui-organizations.summary.vendorStatus" />} value={_.get(dataVal, 'vendor_status', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label={<FormattedMessage id="ui-organizations.summary.defaultLanguage" />} value={getLanguage} />
        </Col>
        <Col xs={12}>
          <KeyValue label={<FormattedMessage id="ui-organizations.summary.description" />} value={_.get(dataVal, 'description', '')} />
        </Col>
        <Col xs={12} className={css.rowHeader}>
          <div className={css.subHeadings}><b>{<FormattedMessage id="ui-organizations.summary.alternativeNames" />}</b></div>
          <MultiColumnList contentData={initialValues.aliases} columnWidths={columnWidths} columnMapping={columnMapping} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default SummaryView;
