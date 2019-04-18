import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import PhoneNumbersMF from '../../MultiForms/PhoneNumbersMF';
import RemoveButton from '../../Utils/RemoveButton';

class PhoneNumbers extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  renderSubPhoneNumbers = (elem, index, fields) => {
    const { contactPeopleForm } = this.props;

    return (
      <Row key={index} className={!contactPeopleForm ? css.panels : css.panelsChild}>
        <PhoneNumbersMF index={index} fields={fields} name={`${elem}`} id={`${elem}`} {...this.props} />
        {RemoveButton(fields, index, 'btn-remove-phonenumbers', 'ui-organizations.contactInfo.remove')}
      </Row>
    );
  }

  render() {
    const { fields, contactPeopleForm } = this.props;
    return (
      <Row>
        { !contactPeopleForm &&
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.contactInfo.phoneNumbers" />}</div>
          </Col>
        }
        {fields.length === 0 &&
          <Col xs={6}>
            <div><em>{<FormattedMessage id="ui-organizations.contactInfo.pleaseAddPhoneNumber" />}</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSubPhoneNumbers)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-organizations.contactInfo.actions.addPhoneNumber" />}</Button>
        </Col>
      </Row>
    );
  }
}

export default PhoneNumbers;
