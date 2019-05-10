import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  MultiSelection,
  Select,
  TextField,
} from '@folio/stripes/components';

import ContactDetailsForm from '../ContactDetailsForm';

const addUrlFields = {
  fieldComponents: {
    value: TextField,
    description: TextField,
    language: Select,
    categories: MultiSelection,
  },
  visibleFields: ['value', 'description', 'language', 'categories'],
  requiredFields: ['value'],
};

const UrlForm = ({ store, change, dispatch, categories, categoriesFormatter, languageList = [] }) => (
  <ContactDetailsForm
    buttonName={<FormattedMessage id="ui-organizations.contactPeople.addUrl" />}
    categories={categories}
    categoriesFormatter={categoriesFormatter}
    change={change}
    dispatch={dispatch}
    emptyListMessage={<FormattedMessage id="ui-organizations.contactPeople.pleaseAddUrl" />}
    fieldsOptions={addUrlFields}
    label={<FormattedMessage id="ui-organizations.contactPeople.addUrl" />}
    labelForFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.url" />}
    labelForPrimaryFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.primaryUrl" />}
    languageList={languageList}
    name="urls"
    store={store}
  />
);

UrlForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesFormatter: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  languageList: PropTypes.arrayOf(PropTypes.object),
  store: PropTypes.object.isRequired,
};

export default UrlForm;
