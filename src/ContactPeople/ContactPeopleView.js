import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, isEmpty, isEqual } from 'lodash';
import { AddressView } from '@folio/stripes/smart-components';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import BoolToCheckbox from '../Utils/BoolToCheckbox';
import css from './ContactPeopleView.css';
import CatIDToLabel from '../Utils/CatIDToLabel';

class ContactPeopleView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired,
      dropdownCategories: PropTypes.arrayOf(PropTypes.object),
      CountryList: PropTypes.arrayOf(PropTypes.object)
    })
  }

  constructor(props) {
    super(props);
    this.getContacts = this.getContacts.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getAddresses = this.getAddresses.bind(this);
    this.getAddPhoneNumbers = this.getAddPhoneNumbers.bind(this);
    this.getAddEmails = this.getAddEmails.bind(this);
    this.getAddUrls = this.getAddUrls.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, initialValues } = props;
    const contactArrProp = initialValues.contacts;
    const contactArrState = state && state.contactArrState ? state.contactArrState : [];
    const queryContacts = (arr) => {
      if (isEmpty(arr)) return false;
      let newQuery = 'query=(id=null)';
      if (arr.length >= 1) {
        const items = arr.map(item => {
          return `id="${item}"`;
        });
        const biuldQuery = items.join(' or ');
        newQuery = `query=(${biuldQuery})`;
      }
      return parentMutator.queryCustom.update({ contactIDs: newQuery });
    };

    if (!isEqual(contactArrProp, contactArrState)) {
      queryContacts(contactArrProp);
      return { contactArrState: contactArrProp };
    }
    return null;
  }

  getVendorcategory() {
    const { parentResources } = this.props;
    const data = ((parentResources || {}).vendorCategory || {}).records || [];
    if (data.length === 0) return null;
    return data;
  }

  getAddresses(val, key) {
    const newVal = Object.assign({}, val);
    newVal.categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';

    const visibleFields = [
      'addressLine1',
      'addressLine2',
      'city',
      'stateRegion',
      'zipCode',
      'country',
      'categories'
    ];

    const labelMap = {
      addressLine1: <FormattedMessage id="ui-organizations.data.contactTypes.addressLine1" />,
      addressLine2: <FormattedMessage id="ui-organizations.data.contactTypes.addressLine2" />,
      stateRegion: <FormattedMessage id="ui-organizations.data.contactTypes.stateProviceOrRegion" />,
      zipCode: <FormattedMessage id="ui-organizations.data.contactTypes.zipOrPostalCode" />,
      country: <FormattedMessage id="ui-organizations.data.contactTypes.country" />,
      categories: <FormattedMessage id="ui-organizations.data.contactTypes.categories" />
    };

    return (
      <Row key={key}>
        <Col xs={12}>
          <AddressView addressObject={newVal} visibleFields={visibleFields} labelMap={labelMap} />
        </Col>
      </Row>
    );
  }

  printKeyValue(label, val, colNum, isRequire) {
    return (
      <Col xs={colNum}>
        <KeyValue label={<FormattedMessage id={`ui-organizations.contactPeople.${label}`} />} value={val} required={isRequire} />
      </Col>
    );
  }

  getAddPhoneNumbers(val, key) {
    const categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';
    return (
      <Row key={key} className={css.rptBlocks}>
        {this.printKeyValue('phoneNumber', get(val, ['phoneNumber'], ''), 3, false)}
        {this.printKeyValue('type', get(val, ['type'], ''), 3, false)}
        {this.printKeyValue('language', get(val, ['language'], ''), 3, false)}
        {this.printKeyValue('categories', categories, 3, false)}
      </Row>
    );
  }

  getAddEmails(val, key) {
    const categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';
    return (
      <Row key={key} className={css.rptBlocks}>
        {this.printKeyValue('email', get(val, ['value'], ''), 3, false)}
        {this.printKeyValue('description', get(val, ['description'], ''), 3, false)}
        {this.printKeyValue('language', get(val, ['language'], ''), 3, false)}
        {this.printKeyValue('categories', categories, 3, false)}
      </Row>
    );
  }

  getAddUrls(val, key) {
    const categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';
    return (
      <Row key={key} className={css.rptBlocks}>
        {this.printKeyValue('url', get(val, ['value'], ''), 3, false)}
        {this.printKeyValue('description', get(val, ['description'], ''), 3, false)}
        {this.printKeyValue('language', get(val, ['language'], ''), 3, false)}
        {this.printKeyValue('categories', categories, 3, false)}
      </Row>
    );
  }

  getCategories(val) {
    if (isEmpty(val.categories)) return [];
    const categories = val.categories.map(item => item.value);
    return categories.join(', ');
  }

  renderContacts(val, key) {
    const fullName = `${get(val, 'prefix', '')} ${get(val, 'firstName', '')} ${get(val, 'lastName', '')}`;
    const language = `${get(val, 'language', '')}`;
    const addressComplete = get(val, 'addresses', '');
    const addPhoneNumbers = get(val, 'phoneNumbers', '');
    const addEmails = get(val, 'emails', '');
    const addURLS = get(val, 'urls', '');

    return (
      <div className={css.horizontalLine}>
        <Row key={key}>
          {this.printKeyValue('name', fullName, 3, false)}
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-organizations.contactPeople.inactive" />}>
              <BoolToCheckbox name="Status" value={get(val, ['inactive'])} />
            </KeyValue>
          </Col>
          {this.printKeyValue('categories', language, 3, false)}
          {this.printKeyValue('language', this.getCategories(val), 3, false)}
          { addressComplete.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>{<FormattedMessage id="ui-organizations.contactPeople.addesses" />}</div>
              </Col>
              <Col xs={12}>
                { addressComplete.map(this.getAddresses) }
              </Col>
            </Fragment>
          )}
          { addPhoneNumbers.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>{<FormattedMessage id="ui-organizations.contactPeople.phoneNumbers" />}</div>
              </Col>
              <Col xs={12}>
                { addPhoneNumbers.map(this.getAddPhoneNumbers) }
              </Col>
            </Fragment>
          )}
          { addEmails.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>{<FormattedMessage id="ui-organizations.contactPeople.emails" />}</div>
              </Col>
              <Col xs={12}>
                { addEmails.map(this.getAddEmails) }
              </Col>
            </Fragment>
          )}
          { addURLS.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>{<FormattedMessage id="ui-organizations.contactPeople.urls" />}</div>
              </Col>
              <Col xs={12}>
                { addURLS.map(this.getAddUrls) }
              </Col>
            </Fragment>
          )}
        </Row>
      </div>
    );
  }

  getContacts() {
    const { parentResources } = this.props;
    const data = ((parentResources || {}).contacts || {}).records || [];
    if (data.length === 0) return [];
    return data;
  }

  render() {
    if (!isEmpty(this.getContacts())) {
      return (
        <div style={{ width: '100%' }}>
          {this.getContacts().map(this.renderContacts)}
        </div>
      );
    } else {
      return (
        <div>
          <p>{<FormattedMessage id="ui-organizations.contactPeople.noContactAvailable" />}</p>
        </div>
      );
    }
  }
}

export default ContactPeopleView;
