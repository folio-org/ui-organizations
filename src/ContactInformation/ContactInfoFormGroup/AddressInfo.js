import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { isEmpty } from 'lodash';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import AddressesMF from '../../MultiForms/AddressesMF';
import CatIDToObject from '../../Utils/CatIDToObject';

class AddressInfo extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  componentDidMount() {
    const { stripes: { store }, dispatch, change, dropdownVendorCategories } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    if (formValues && !isEmpty(formValues.addresses)) {
      const categories = CatIDToObject(formValues.addresses, dropdownVendorCategories);
      dispatch(change('addresses', categories));
    }
  }

  renderSubAddress = (elem, index, fields) => {
    const { contactPeopleForm } = this.props;

    return (
      <Row key={index} className={!contactPeopleForm ? css.panels : css.panelsChild}>
        <AddressesMF
          index={index}
          fields={fields}
          name={`${elem}`}
          id={`${elem}`}
          {...this.props}
        />
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <div className={css.subHeadings}>Address Info</div>
          {fields.length === 0 &&
            <div><em>- Please add address info -</em></div>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubAddress)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add Address</Button>
        </Col>
      </Row>
    );
  }
}

export default AddressInfo;
