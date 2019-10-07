import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import {
  Button,
  Col,
} from '@folio/stripes/components';

import EmbeddedContactForm from './EmbeddedContactForm';
import css from './ContactDetailsForm.css';

class ContactDetailsForm extends Component {
  static propTypes = {
    buttonName: PropTypes.node.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object),
    categoriesFormatter: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    emptyListMessage: PropTypes.node.isRequired,
    fieldsOptions: PropTypes.object.isRequired,
    label: PropTypes.node.isRequired,
    labelForFieldsGroup: PropTypes.node.isRequired,
    labelForPrimaryFieldsGroup: PropTypes.node.isRequired,
    languageList: PropTypes.arrayOf(PropTypes.object),
    phoneTypesList: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
  };

  renderFieldsGroup = ({ fields }) => {
    const {
      buttonName,
      categories,
      categoriesFormatter,
      change,
      dispatch,
      fieldsOptions,
      labelForFieldsGroup,
      labelForPrimaryFieldsGroup,
      languageList,
      name,
      phoneTypesList,
      store,
    } = this.props;

    return (
      <div className={css.editList}>
        <Col>
          <div className={css.legend}>
            {this.props.label}
          </div>
        </Col>
        <Col>
          {fields.length === 0 &&
            <div>
              <em>
                {this.props.emptyListMessage}
              </em>
            </div>
          }
          <ul className={css.formList}>
            {fields.map((fieldName, i) => (
              <li
                className={css.formListItem}
                key={fieldName}
              >
                <EmbeddedContactForm
                  categories={categories}
                  categoriesFormatter={categoriesFormatter}
                  change={change}
                  dispatch={dispatch}
                  fieldComponents={fieldsOptions.fieldComponents}
                  fieldKey={i}
                  fieldName={fieldName}
                  handleDelete={(index) => fields.remove(index)}
                  labelForFieldsGroup={labelForFieldsGroup}
                  labelForPrimaryFieldsGroup={labelForPrimaryFieldsGroup}
                  labelMap={fieldsOptions.labelMap}
                  languageList={languageList}
                  name={name}
                  phoneTypesList={phoneTypesList}
                  requiredFields={fieldsOptions.requiredFields}
                  store={store}
                  visibleFields={fieldsOptions.visibleFields}
                />
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <Button
            data-test-add-contact-details-block
            onClick={() => fields.push({})}
          >
            {buttonName}
          </Button>
        </Col>
      </div>
    );
  };

  render() {
    return (
      <FieldArray name={this.props.name} component={this.renderFieldsGroup} />
    );
  }
}

export default ContactDetailsForm;
