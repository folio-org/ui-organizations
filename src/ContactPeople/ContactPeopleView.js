import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, isEmpty, isEqual, cloneDeep } from 'lodash';

import { Icon } from '@folio/stripes/components';

import { transformCategoryIdsToLables } from '../common/utils/category';

import ContactPersonDetails from './ContactPerson/ContactPersonDetails';
import ContactPersonAddresses from './ContactPerson/ContactPersonAddresses';
import ContactPersonPhones from './ContactPerson/ContactPersonPhones';
import ContactPersonEmails from './ContactPerson/ContactPersonEmails';
import ContactPersonURLs from './ContactPerson/ContactPersonURLs';

class ContactPeopleView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired,
      dropdownCategories: PropTypes.arrayOf(PropTypes.object),
      CountryList: PropTypes.arrayOf(PropTypes.object)
    }),
    parentMutator: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.renderContacts = this.renderContacts.bind(this);
  }

  componentDidMount() {
    const { initialValues } = this.props;

    this.updateQueryContacts(initialValues.contacts);
  }

  componentDidUpdate(prevProps) {
    const { initialValues } = this.props;

    if (!isEqual(initialValues.contacts, prevProps.initialValues.contacts)) {
      this.updateQueryContacts(initialValues.contacts);
    }
  }

  updateQueryContacts = contacts => {
    const { parentMutator } = this.props;

    if (isEmpty(contacts)) return;
    let newQuery = 'query=(id=null)';
    if (contacts.length >= 1) {
      const items = contacts.map(item => {
        return `id="${item}"`;
      });
      const biuldQuery = items.join(' or ');
      newQuery = `query=(${biuldQuery})`;
    }

    parentMutator.queryCustom.update({ contactIDs: newQuery });
  }

  getVendorcategory() {
    const { parentResources } = this.props;
    const data = ((parentResources || {}).vendorCategory || {}).records || [];
    if (data.length === 0) return null;
    return data;
  }

  renderContacts(contact, key) {
    const vendorCategories = this.getVendorcategory();

    const addressComplete = get(contact, 'addresses', []).map(address => {
      const updatedAddress = cloneDeep(address);
      updatedAddress.primaryAddress = address.isPrimary;
      updatedAddress.categories = transformCategoryIdsToLables(vendorCategories, address.categories);
      return updatedAddress;
    });

    const addEmails = get(contact, 'emails', []).map(email => {
      const updatedEmail = cloneDeep(email);
      updatedEmail.categories = transformCategoryIdsToLables(vendorCategories, email.categories);
      return updatedEmail;
    });

    const addPhoneNumbers = get(contact, 'phoneNumbers', []).map(phone => {
      const updatedPhone = cloneDeep(phone);
      updatedPhone.categories = transformCategoryIdsToLables(vendorCategories, phone.categories);
      return updatedPhone;
    });

    const addURLS = get(contact, 'urls', []).map(url => {
      const updatedUrl = cloneDeep(url);
      updatedUrl.categories = transformCategoryIdsToLables(vendorCategories, url.categories);
      return updatedUrl;
    });

    const contactCategories = transformCategoryIdsToLables(vendorCategories, contact.categories);

    return (
      <div key={key}>
        <ContactPersonDetails
          firstName={contact.firstName}
          lastName={contact.lastName}
          prefix={contact.prefix}
          language={contact.language}
          isInactive={contact.inactive}
          categories={contactCategories}
        />

        <ContactPersonAddresses addresses={addressComplete} />

        <ContactPersonPhones phones={addPhoneNumbers} />

        <ContactPersonEmails emails={addEmails} />

        <ContactPersonURLs urls={addURLS} />
      </div>
    );
  }

  render() {
    const { parentResources } = this.props;

    if (get(parentResources, 'contacts.isPending', true)) {
      return <Icon icon="spinner-ellipsis" />;
    }

    const contacts = get(parentResources, 'contacts.records', []);

    if (!isEmpty(contacts)) {
      return (
        <div style={{ width: '100%' }}>
          {contacts.map(this.renderContacts)}
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
