import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { isEmpty } from 'lodash';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import EmailsMF from '../../MultiForms/EmailsMF';
import CatIDToObject from '../../Utils/CatIDToObject';

class EmailAddresses extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderSubEmailAddresses = this.renderSubEmailAddresses.bind(this);
  }

  componentDidMount() {
    const { stripes: { store }, dispatch, change, dropdownVendorCategories } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    if (formValues && !isEmpty(formValues.emails)) {
      const categories = CatIDToObject(formValues.emails, dropdownVendorCategories);
      dispatch(change('emails', categories));
    }
  }

  renderSubEmailAddresses = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <EmailsMF
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
        <Col xs={12}>
          <div className={css.subHeadings}>Email Address</div>
        </Col>
        {fields.length === 0 &&
          <Col xs={12}>
            <div><em>- Please add email -</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSubEmailAddresses)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add Email</Button>
        </Col>
      </Row>
    );
  }
}

export default EmailAddresses;
