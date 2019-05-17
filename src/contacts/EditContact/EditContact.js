import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { find } from 'lodash';

import stripesForm from '@folio/stripes/form';
import { AppIcon } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  MultiSelection,
  Pane,
  PaneMenu,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import { EMPTY_DROPDOWN_ITEM } from '../../common/utils/dropdown';
import languageList from '../../Utils/Languages';
import phoneTypesList from '../../Utils/PhoneTypes';
import { Required } from '../../Utils/Validate';
import AddressForm from './AddressForm';
import EmailForm from './EmailForm';
import PhoneForm from './PhoneForm';
import UrlForm from './UrlForm';
import { CONTACT_STATUSES } from './constants';
import css from './EditContact.css';

const getDropdownList = (list) => ([EMPTY_DROPDOWN_ITEM, ...list]);

class EditContact extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    change: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    paneTitle: PropTypes.node.isRequired,
    pristine: PropTypes.func.isRequired,
    stripes: PropTypes.object.isRequired,
    submitting: PropTypes.func.isRequired,
  };

  categoriesFormatter = ({ option }) => {
    const item = find(this.props.categories, { id: option }) || option;

    if (!item) return option;

    return <option key={item.id}>{item.value}</option>;
  };

  itemToString = option => option;

  getLastMenu = () => {
    const { pristine, submitting, handleSubmit } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-organizations.contacts.button.save">
          {(title) => (
            <Button
              buttonStyle="primary"
              disabled={pristine || submitting}
              marginBottom0
              onClick={handleSubmit}
              title={title}
              type="submit"
            >
              {title}
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  render() {
    const {
      categories,
      change,
      dispatch,
      onClose,
      paneTitle,
      stripes: { store },
    } = this.props;

    return (
      <Pane
        appIcon={
          <AppIcon
            app="organizations"
            appIconKey="organizations"
          />
        }
        defaultWidth="fill"
        dismissible
        id="edit-contact"
        lastMenu={this.getLastMenu()}
        onClose={onClose}
        paneTitle={paneTitle}
      >
        <Row>
          <Col
            xs={12}
            md={8}
            mdOffset={2}
          >
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
                      dataOptions={[EMPTY_DROPDOWN_ITEM]}
                      fullWidth
                      label={<FormattedMessage id="ui-organizations.contactPeople.status" />}
                      name="inactive"
                    >
                      {Object.keys(CONTACT_STATUSES).map((key) => (
                        <FormattedMessage
                          id={`ui-organizations.contactPeople.status.${key}`}
                          key={key}
                        >
                          {(message) => <option value={CONTACT_STATUSES[key]}>{message}</option>}
                        </FormattedMessage>
                      ))}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <Field
                      component={Select}
                      dataOptions={getDropdownList(languageList)}
                      fullWidth
                      label={<FormattedMessage id="ui-organizations.contactPeople.language" />}
                      name="language"
                    />
                  </Col>
                  <Col xs={3}>
                    <Field
                      component={MultiSelection}
                      dataOptions={categories.map(({ id }) => id)}
                      formatter={this.categoriesFormatter}
                      itemToString={this.itemToString}
                      label={<FormattedMessage id="ui-organizations.contactPeople.categories" />}
                      name="categories"
                      onBlur={(e) => e.preventDefault()}
                    />
                  </Col>
                  <Col xs={6}>
                    <Field
                      component={TextArea}
                      fullWidth
                      label={<FormattedMessage id="ui-organizations.contactPeople.note" />}
                      name="notes"
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
                      categoriesFormatter={this.categoriesFormatter}
                      change={change}
                      dispatch={dispatch}
                      languageList={getDropdownList(languageList)}
                      store={store}
                    />
                  </Col>
                  <Col
                    data-test-phone-form
                    xs={12}
                  >
                    <PhoneForm
                      categories={categories}
                      categoriesFormatter={this.categoriesFormatter}
                      change={change}
                      dispatch={dispatch}
                      languageList={getDropdownList(languageList)}
                      phoneTypesList={getDropdownList(phoneTypesList)}
                      store={store}
                    />
                  </Col>
                  <Col
                    data-test-email-form
                    xs={12}
                  >
                    <EmailForm
                      categories={categories}
                      categoriesFormatter={this.categoriesFormatter}
                      change={change}
                      dispatch={dispatch}
                      languageList={getDropdownList(languageList)}
                      store={store}
                    />
                  </Col>
                  <Col
                    data-test-url-form
                    xs={12}
                  >
                    <UrlForm
                      categories={categories}
                      categoriesFormatter={this.categoriesFormatter}
                      change={change}
                      dispatch={dispatch}
                      languageList={getDropdownList(languageList)}
                      store={store}
                    />
                  </Col>
                </Row>
              </Accordion>
            </AccordionSet>
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default stripesForm({
  enableReinitialize: true,
  form: 'EditContact',
  navigationCheck: true,
})(EditContact);
