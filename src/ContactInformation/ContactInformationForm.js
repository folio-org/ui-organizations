import React from 'react';
import { FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes/components';
import { AddressInfo, PhoneNumbers, EmailAddresses, Urls } from './ContactInfoFormGroup';

class ContactInformationForm extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Addess" name="addresses" id="addresses" component={AddressInfo} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Phone Numbers" name="phoneNumbers" id="phoneNumbers" component={PhoneNumbers} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Email Addresses" name="emails" id="emails" component={EmailAddresses} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="urls" name="urls" id="urls" component={Urls} {...this.props} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default ContactInformationForm;
