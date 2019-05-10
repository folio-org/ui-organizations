import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  getFormValues,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  Icon,
  Row,
} from '@folio/stripes-components';

import { Required } from '../../../Utils/Validate';
import css from './ContactDetailsForm.css';

class EmbeddedContactForm extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    categoriesFormatter: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    fieldComponents: PropTypes.object.isRequired,
    fieldKey: PropTypes.number.isRequired,
    fieldName: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    labelForFieldsGroup: PropTypes.node.isRequired,
    labelForPrimaryFieldsGroup: PropTypes.node.isRequired,
    languageList: PropTypes.arrayOf(PropTypes.object),
    phoneTypesList: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    requiredFields: PropTypes.arrayOf(PropTypes.string),
    store: PropTypes.object.isRequired,
    visibleFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static defaultProps = {
    requiredFields: [],
  };

  setPrimary = (id) => {
    const { dispatch, change, store, name } = this.props;
    const formValues = getFormValues('EditContact')(store.getState());

    formValues[name].forEach((a, i) => {
      if (i === id) {
        dispatch(change(`${name}[${i}].isPrimary`, true));
      } else {
        dispatch(change(`${name}[${i}].isPrimary`, false));
      }
    });
  }

  primaryRadio = ({ input, ...props }) => {
    return (
      <label className={css.primaryToggle} htmlFor={props.id}>
        <input
          type="radio"
          checked={input.value}
          id={props.id}
          onChange={() => this.setPrimary(this.props.fieldKey)}
          name={`${this.props.name}[${this.props.fieldKey}].isPrimary`}
        />
        {this.props.labelForPrimaryFieldsGroup}
      </label>
    );
  };

  render() {
    const {
      categories,
      categoriesFormatter,
      fieldComponents,
      fieldKey,
      fieldName,
      handleDelete,
      labelForFieldsGroup,
      languageList,
      name,
      phoneTypesList,
      requiredFields,
      visibleFields,
    } = this.props;

    const renderedFields = visibleFields.map((field, i) => {
      const isRequred = requiredFields.includes(field);
      let fieldProps = {};

      if (isRequred) {
        fieldProps = {
          required: true,
          validate: Required,
        };
      }

      if (field === 'categories') {
        fieldProps = {
          fieldProps,
          ...{
            dataOptions: categories.map(({ id }) => id),
            formatter: categoriesFormatter,
            onBlur: e => e.preventDefault(),
          }
        };
      }

      if (field === 'language') {
        fieldProps = {
          fieldProps,
          ...{
            dataOptions: languageList,
          }
        };
      }

      if (field === 'type') {
        fieldProps = {
          fieldProps,
          ...{
            dataOptions: phoneTypesList,
          }
        };
      }

      return (
        <Col
          xs={3}
          key={`${fieldKey}-${i}`}
        >
          <Field
            component={fieldComponents[field]}
            label={<FormattedMessage id={`ui-organizations.contactPeople.${name}.${field}`} />}
            name={`${fieldName}.${field}`}
            {...fieldProps}
          />
        </Col>
      );
    });

    return (
      <Fragment>
        <div
          className={css.formHeader}
          start="xs"
        >
          <div className={css.label}>
            {labelForFieldsGroup}
            {(fieldKey + 1)}
          </div>
          <div className={css.primaryLabel}>
            <Field
              component={this.primaryRadio}
              fieldKey={this.props.fieldKey}
              name={`${fieldName}.isPrimary`}
            />
          </div>
          <div className={css.headerActions}>
            <Button
              buttonStyle="link slim"
              data-test-remove-contact-details-block
              onClick={() => handleDelete(fieldKey)}
              style={{ margin: 0, padding: 0 }}
            >
              <Icon
                icon="trash"
                height="24px"
                width="24px"
              />
              <span className="sr-only">
                {this.props.fieldKey + 1}
              </span>
            </Button>
          </div>
        </div>
        <div className={css.formBody}>
          <Row key={fieldKey}>
            {renderedFields}
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default EmbeddedContactForm;
