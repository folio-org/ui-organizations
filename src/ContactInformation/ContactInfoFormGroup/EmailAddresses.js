import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Col,
  RepeatableField,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import { FieldAutoSuggest } from '@folio/stripes-acq-components';

import CategoryDropdown from '../../Utils/CategoryDropdown';
import { Required } from '../../Utils/Validate';

const EmailAddresses = ({ dropdownLanguages, dropdownVendorCategories }) => {
  const EmailsMF = (name, index, fields) => {
    const valueKey = 'value';
    const items = fields.getAll().filter((item, i) => item[valueKey] && i !== index);

    return (
      <Row>
        <Col xs={12} md={3}>
          <FieldAutoSuggest
            items={items}
            labelId="ui-organizations.contactInfo.emailAddress"
            name={`${name}.${valueKey}`}
            required
            validate={[Required]}
            valueKey={valueKey}
            onSelect={(item) => {
              fields.remove(index);
              fields.insert(index, item);
            }}
          />
        </Col>
        <Col xs={12} md={3}>
          <Field
            label={<FormattedMessage id="ui-organizations.contactInfo.description" />}
            name={`${name}.description`}
            component={TextField}
            fullWidth
          />
        </Col>
        <Col xs={12} md={3}>
          <Field
            label={<FormattedMessage id="ui-organizations.contactInfo.language" />}
            name={`${name}.language`}
            component={Select}
            fullWidth
            dataOptions={dropdownLanguages}
          />
        </Col>
        <Col xs={12} md={3}>
          <CategoryDropdown
            dropdownVendorCategories={dropdownVendorCategories}
            name={name}
          />
        </Col>
      </Row>
    );
  };

  return (
    <FieldArray
      addLabel={<FormattedMessage id="ui-organizations.contactInfo.actions.addEmail" />}
      component={RepeatableField}
      legend={<FormattedMessage id="ui-organizations.contactInfo.emailAddress" />}
      name="emails"
      renderField={EmailsMF}
    />
  );
};

EmailAddresses.propTypes = {
  dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
  dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
};

export default EmailAddresses;
