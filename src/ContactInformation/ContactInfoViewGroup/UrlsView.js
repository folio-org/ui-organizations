import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import css from '../ContactInformationView.css';
import languageLookUp from '../../Utils/languageLookUp';
import CatIDToLabel from '../../Utils/CatIDToLabel';
import { PrintKeyValue } from '../../Utils/PrintKeyValue';

class UrlsView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.getUrls = this.getUrls.bind(this);
  }

  getUrls(val, key) {
    const { dropdownVendorCategories } = this.props;
    const rowUrlCount = this.props.dataVal.length - 1 !== key;
    const getLanguageUrl = languageLookUp(get(val, 'language', ''));
    const categoriesUrl = CatIDToLabel(val.categories, dropdownVendorCategories) || '';

    return (
      <Row key={key}>
        {PrintKeyValue('ui-organizations.contactInfo.url', get(val, 'value', ''), 5, false)}
        {PrintKeyValue('ui-organizations.contactInfo.language', getLanguageUrl, 3, false)}
        {PrintKeyValue('ui-organizations.contactInfo.categories', categoriesUrl, 4, false)}
        {rowUrlCount &&
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
        <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.contactInfo.urls" />}</div>
        {dataVal.map(this.getUrls)}
      </Col>
    );
  }
}

export default UrlsView;
