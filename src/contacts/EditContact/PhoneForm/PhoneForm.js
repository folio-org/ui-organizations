import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  MultiSelection,
  Select,
  TextField,
} from '@folio/stripes/components';

import ContactDetailsForm from '../ContactDetailsForm';

const addPhoneNumberFields = {
  fieldComponents: {
    phoneNumber: TextField,
    type: Select,
    language: Select,
    categories: MultiSelection,
  },
  visibleFields: ['phoneNumber', 'type', 'language', 'categories'],
  requiredFields: ['phoneNumber'],
};

const PhoneForm = ({ store, change, dispatch, categories, categoriesFormatter, languageList = [], phoneTypesList = [] }) => (
  <ContactDetailsForm
    buttonName={<FormattedMessage id="ui-organizations.contactPeople.addPhoneNumber" />}
    categories={categories}
    categoriesFormatter={categoriesFormatter}
    change={change}
    dispatch={dispatch}
    emptyListMessage={<FormattedMessage id="ui-organizations.contactPeople.pleaseAddPhoneNumbers" />}
    fieldsOptions={addPhoneNumberFields}
    label={<FormattedMessage id="ui-organizations.contactPeople.addPhoneNumber" />}
    labelForFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.phone" />}
    labelForPrimaryFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.primaryPhone" />}
    languageList={languageList}
    name="phoneNumbers"
    phoneTypesList={phoneTypesList}
    store={store}
  />
);

PhoneForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesFormatter: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  languageList: PropTypes.arrayOf(PropTypes.object),
  phoneTypesList: PropTypes.arrayOf(PropTypes.object),
  store: PropTypes.object.isRequired,
};

export default PhoneForm;
