import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, isEmpty, isEqual } from 'lodash';

import { Icon } from '@folio/stripes/components';

import ContactPerson from './ContactPerson';

class ContactPeopleView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired,
      dropdownCategories: PropTypes.arrayOf(PropTypes.object),
      CountryList: PropTypes.arrayOf(PropTypes.object),
    }),
    parentMutator: PropTypes.object,
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

  render() {
    const { parentResources } = this.props;

    if (get(parentResources, 'contacts.isPending', true)) {
      return <Icon icon="spinner-ellipsis" />;
    }

    const contacts = get(parentResources, 'contacts.records', []);
    const categories = get(parentResources, 'vendorCategory.records', []);

    if (!isEmpty(contacts)) {
      return (
        <div style={{ width: '100%' }}>
          {
            contacts.map(contact => (
              <ContactPerson
                contact={contact}
                categories={categories}
                key={contact.id}
              />
            ))
          }
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
