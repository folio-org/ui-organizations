import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from '../ContactInformationView.css';
import languageLookUp from '../../Utils/languageLookUp';
import CatIDToLabel from '../../Utils/CatIDToLabel';

class EmailView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.getEmail = this.getEmail.bind(this);
  }

  printKeyValue(label, val, colNum, isRequire) {
    return (
      <Col xs={colNum}>
        <KeyValue label={<FormattedMessage id={`ui-organizations.contactInfo.${label}`} />} value={val} required={isRequire} />
      </Col>
    );
  }

  getEmail(val, key) {
    const { dropdownVendorCategories } = this.props;
    const rowEmailCount = (this.props.dataVal.length - 1) !== key;
    const categoriesEml = CatIDToLabel(val.categories, dropdownVendorCategories) || '';
    const getLanguageEml = languageLookUp(get(val, 'language', ''));

    return (
      <Row key={key}>
        {this.printKeyValue('email', get(val, ['value'], ''), 5, false)}
        {this.printKeyValue('language', getLanguageEml, 3, false)}
        {this.printKeyValue('categories', categoriesEml, 4, false)}
        {rowEmailCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
      </Row>
    );
  }

  render() {
    const { dataVal } = this.props;

    return (
      <Col xs={12} className={css.rowHeader}>
        <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.contactInfo.emailAddress" />}</div>
        {dataVal.map(this.getEmail)}
      </Col>
    );
  }
}

export default EmailView;
