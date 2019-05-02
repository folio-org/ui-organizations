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

const UrlForm = ({ store, change, dispatch, categories }) => (
  <ContactDetailsForm
    buttonName={<FormattedMessage id="ui-organizations.contactPeople.addUrl" />}
    categories={categories}
    change={change}
    dispatch={dispatch}
    emptyListMessage={<FormattedMessage id="ui-organizations.contactPeople.pleaseAddUrl" />}
    fieldsOptions={addUrlFields}
    label={<FormattedMessage id="ui-organizations.contactPeople.addUrl" />}
    labelForFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.url" />}
    labelForPrimaryFieldsGroup={<FormattedMessage id="ui-organizations.contactPeople.primaryUrl" />}
    name="urls"
    store={store}
  />
);

UrlForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

export default UrlForm;