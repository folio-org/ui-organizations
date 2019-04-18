import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import AddressesMF from '../../MultiForms/AddressesMF';

class AddressInfo extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.removeButtonAdd = this.removeButtonAdd.bind(this);
  }

  removeButtonAdd(fields, index, id, label) {
    return (
      <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
        <Button id={id} onClick={() => fields.remove(index)} buttonStyle="danger">
          {<FormattedMessage id={label} />}
        </Button>
      </Col>
    );
  }

  renderSubAddress = (elem, index, fields) => {
    const { contactPeopleForm } = this.props;
    return (
      <Row key={index} className={!contactPeopleForm ? css.panels : css.panelsChild}>
        <AddressesMF index={index} fields={fields} name={`${elem}`} id={`${elem}`} {...this.props} />
        {this.removeButtonAdd(fields, index, 'btn-remove-address', 'ui-organizations.data.contactTypes.remove')}
      </Row>
    );
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <div className={css.subHeadings}>{<FormattedMessage id="ui-organizations.data.contactTypes.address" />}</div>
          {fields.length === 0 &&
            <div><em>{<FormattedMessage id="ui-organizations.data.contactTypes.noAddressInfo" />}</em></div>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubAddress)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-organizations.contactInfo.actions.addAddress" />}</Button>
        </Col>
      </Row>
    );
  }
}

export default AddressInfo;
