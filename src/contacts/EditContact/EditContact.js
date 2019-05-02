import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import stripesForm from '@folio/stripes/form';
import {
  Accordion,
  AccordionSet,
  Col,
  MultiSelection,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import { Required } from '../../Utils/Validate';
import AddressForm from './AddressForm';
import EmailForm from './EmailForm';
import PhoneForm from './PhoneForm';
import UrlForm from './UrlForm';
import css from './EditContact.css';

class EditContact extends Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { stripes: { store }, change, dispatch, categories } = this.props;

    return (
      <AccordionSet>
        <Accordion
          label={<FormattedMessage id="ui-organizations.contactPeople" />}
        >
          <Row>
            <Col xs={12}>
              <div className={css.legend}>
                {<FormattedMessage id="ui-organizations.contactPeople.name" />}
              </div>
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                fullWidth
                label={<FormattedMessage id="ui-organizations.contactPeople.prefix" />}
                name="prefix"
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                fullWidth
                label={<FormattedMessage id="ui-organizations.contactPeople.details.lastName" />}
                name="lastName"
                required
                validate={[Required]}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                fullWidth
                label={<FormattedMessage id="ui-organizations.contactPeople.details.firstName" />}
                name="firstName"
                required
                validate={[Required]}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={Select}
                fullWidth
                label={<FormattedMessage id="ui-organizations.contactPeople.status" />}
                name="inactive"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Field
                component={Select}
                fullWidth
                label={<FormattedMessage id="ui-organizations.contactPeople.language" />}
                name="language"
              />
            </Col>
            <Col xs={3}>
              <Field
                component={MultiSelection}
                dataOptions={categories}
                label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}
                name="categories"
                onBlur={(e) => e.preventDefault()}
              />
            </Col>
          </Row>
          <Row start="xs">
            <Col
              data-test-address-form
              xs={12}
            >
              <AddressForm
                categories={categories}
                change={change}
                dispatch={dispatch}
                store={store}
              />
            </Col>
            <Col
              data-test-phone-form
              xs={12}
            >
              <PhoneForm
                categories={categories}
                change={change}
                dispatch={dispatch}
                store={store}
              />
            </Col>
            <Col
              data-test-email-form
              xs={12}
            >
              <EmailForm
                categories={categories}
                change={change}
                dispatch={dispatch}
                store={store}
              />
            </Col>
            <Col
              data-test-url-form
              xs={12}
            >
              <UrlForm
                categories={categories}
                change={change}
                dispatch={dispatch}
                store={store}
              />
            </Col>
          </Row>
        </Accordion>
      </AccordionSet>
    );
  }
}

export default stripesForm({
  enableReinitialize: true,
  form: 'EditContact',
  navigationCheck: true,
})(EditContact);
