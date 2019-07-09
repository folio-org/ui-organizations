import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { MultiColumnList, Row, Col, KeyValue } from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import css from './SummaryView.css';
import languageLookUp from '../Utils/languageLookUp';
import { PrintBoolToCheckbox } from '../Utils/PrintKeyValue';

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
      'description': <FormattedMessage id="ui-organizations.summary.description" />,
    };
    const getLanguage = languageLookUp(get(dataVal, 'language', ''));

    const metadata = get(dataVal, 'metadata');

    return (
      <Row>
        <Col xs={12}>
          {metadata && <ViewMetaData metadata={metadata} />}
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.name" />}
            value={get(dataVal, 'name', '')}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.code" />}
            value={get(dataVal, 'code', '')}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
            value={get(dataVal, ['erpCode'], '')}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.organizationStatus" />}
            value={get(dataVal, 'status', '')}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.defaultLanguage" />}
            value={getLanguage}
          />
        </Col>
        {PrintBoolToCheckbox('ui-organizations.summary.isVendor', dataVal.isVendor, 4)}
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            value={get(dataVal, 'description', '')}
          />
        </Col>
        <Col xs={12} className={css.rowHeader}>
          <div className={css.subHeadings}>
            <b>
              <FormattedMessage id="ui-organizations.summary.alternativeNames" />
            </b>
          </div>
          <MultiColumnList
            contentData={initialValues.aliases}
            columnWidths={columnWidths}
            columnMapping={columnMapping}
          />
          <br />
        </Col>
      </Row>
    );
  }
}

export default SummaryView;
