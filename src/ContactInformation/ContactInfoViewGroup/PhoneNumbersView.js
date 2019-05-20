import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from '../ContactInformationView.css';
import languageLookUp from '../../Utils/languageLookUp';
import CatIDToLabel from '../../Utils/CatIDToLabel';

class PhoneNumbersView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.getPhoneNumbers = this.getPhoneNumbers.bind(this);
  }

  printKeyValue(label, val, isRequire) {
    return (
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id={`ui-organizations.contactInfo.${label}`} />} value={val} required={isRequire} />
      </Col>
    );
  }

  getPhoneNumbers(val, key) {
    const { dropdownVendorCategories } = this.props;
    const rowCount = (this.props.dataVal.length - 1) !== key;
    const categories = CatIDToLabel(val.categories, dropdownVendorCategories) || '';
    const phonenumber = get(val, 'phoneNumber', '');
    const type = get(val, 'type', '');
    const getLanguage = languageLookUp(get(val, 'language', ''));

    return (
      <Row key={key}>
        {this.printKeyValue('phoneNumber', phonenumber, false)}
        {this.printKeyValue('type', type, false)}
        {this.printKeyValue('language', getLanguage, false)}
        {this.printKeyValue('categories', categories, false)}
        {rowCount &&
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
        <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.contactInfo.phoneNumbers" />}</div>
        {dataVal.map(this.getPhoneNumbers)}
      </Col>
    );
  }
}

export default PhoneNumbersView;
