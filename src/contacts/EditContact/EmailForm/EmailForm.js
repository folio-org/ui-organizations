import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  MultiSelection,
  Select,
  TextField,
} from '@folio/stripes/components';

import ContactDetailsForm from '../ContactDetailsForm';

const addEmailFields = {
  fieldComponents: {
    value: TextField,
    description: TextField,
    language: Select,
    categories: MultiSelection,
  },
  visibleFields: ['value', 'description', 'language', 'categories'],
  requiredFields: ['value'],
};

const EmailForm = ({ store, change, dispatch, categories, categoriesFormatter }) => (
  <ContactDetailsForm
    buttonName={<FormattedMessage id="ui-organizations.contactPeople.addEmail" />}
    categories={categories}
    categoriesFormatter={categoriesFormatter}
    change={change}
    dispatch={dispatch}
    emptyListMessage={<FormattedMessage id="ui-organizations.contactPeople.pleaseAddEmail" />}
    fieldsOptions={addEmailFields}
    label={<FormattedMessage id="ui-organizations.contactPeople.addEmail" />}
    labelForFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.email" />}
    labelForPrimaryFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.primaryEmail" />}
    name="emails"
    store={store}
  />
);

EmailForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesFormatter: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

export default EmailForm;
