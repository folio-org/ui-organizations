import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import { UrlsMF } from '../../MultiForms';
import RemoveButton from '../../Utils/RemoveButton';

class Urls extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object,
    }),
    contactPeopleForm: PropTypes.string,
  };

  renderSubUrl = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <UrlsMF index={index} fields={fields} name={`${elem}`} id={`${elem}`} {...this.props} />
        {RemoveButton(fields, index, 'btn-remove-url', 'ui-organizations.contactInfo.remove')}
      </Row>
    );
  }

  render() {
    const { fields } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.contactInfo.urls" />}</div>
          {fields.length === 0 &&
            <div><em>{<FormattedMessage id="ui-organizations.contactInfo.pleaseAddURL" />}</em></div>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubUrl)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-organizations.contactInfo.addURL" />}</Button>
        </Col>
      </Row>
    );
  }
}

export default Urls;
