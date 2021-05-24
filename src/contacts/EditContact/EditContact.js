import React, {
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { useHistory } from 'react-router';

import stripesForm from '@folio/stripes/final-form';
import { AppIcon } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Button,
  checkScope,
  Col,
  collapseAllSections,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Pane,
  PaneFooter,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import {
  FieldSelectFinal,
  handleKeyCommand,
  validateRequired,
} from '@folio/stripes-acq-components';

import CategoryDropdown from '../../Utils/CategoryDropdown';
import {
  AddressInfo,
  FieldLanguage,
} from '../../common/components';
import { ORGANIZATIONS_ROUTE } from '../../common/constants';

import phoneTypesList from '../../Utils/PhoneTypes';
import {
  CONTACT_PERSON_ACCORDIONS,
  CONTACT_PERSON_ACCORDION_LABELS,
} from '../constants';

import { CONTACT_STATUSES } from './constants';
import EmailForm from './EmailForm';
import PhoneForm from './PhoneForm';
import UrlForm from './UrlForm';

const EditContact = ({
  categories,
  onClose,
  paneTitle,
  handleSubmit,
  pristine,
  submitting,
}) => {
  const history = useHistory();
  const accordionStatusRef = useRef();
  const paneFooter = useMemo(
    () => {
      const start = (
        <FormattedMessage id="ui-organizations.button.cancel">
          {(btnLabel) => (
            <Button
              id="clickable-close-contact-person-footer"
              buttonStyle="default mega"
              onClick={onClose}
            >
              {btnLabel}
            </Button>
          )}
        </FormattedMessage>
      );

      const end = (
        <Button
          id="clickable-save-contact-person-footer"
          type="submit"
          buttonStyle="primary mega"
          disabled={pristine || submitting}
          onClick={handleSubmit}
        >
          <FormattedMessage id="ui-organizations.button.saveAndClose" />
        </Button>
      );

      return (
        <PaneFooter
          renderStart={start}
          renderEnd={end}
        />
      );
    },
    [submitting, pristine, handleSubmit, onClose],
  );

  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(onClose),
    },
    {
      name: 'save',
      handler: handleKeyCommand(handleSubmit, { disabled: pristine || submitting }),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
    {
      name: 'search',
      handler: handleKeyCommand(() => history.push(ORGANIZATIONS_ROUTE)),
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
        appIcon={
          <AppIcon
            app="organizations"
            appIconKey="organizations"
          />
        }
        defaultWidth="fill"
        dismissible
        id="edit-contact"
        footer={paneFooter}
        onClose={onClose}
        paneTitle={paneTitle}
      >
        <Row>
          <Col
            xs={12}
            md={8}
            mdOffset={2}
          >
            <AccordionStatus ref={accordionStatusRef}>
              <Row end="xs">
                <Col xs={12}>
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet>
                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.NAME}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.NAME]}
                >
                  <Row>
                    <Col xs={3}>
                      <Field
                        component={TextField}
                        fullWidth
                        label={<FormattedMessage id="ui-organizations.contactPeople.prefix" />}
                        name="prefix"
                      />
                    </Col>
                    <Col xs={3}>
                      <Field
                        component={TextField}
                        fullWidth
                        label={<FormattedMessage id="ui-organizations.contactPeople.details.lastName" />}
                        name="lastName"
                        required
                        validate={validateRequired}
                      />
                    </Col>
                    <Col xs={3}>
                      <Field
                        component={TextField}
                        fullWidth
                        label={<FormattedMessage id="ui-organizations.contactPeople.details.firstName" />}
                        name="firstName"
                        required
                        validate={validateRequired}
                      />
                    </Col>
                    <Col xs={3}>
                      <FieldSelectFinal
                        dataOptions={CONTACT_STATUSES}
                        label={<FormattedMessage id="ui-organizations.contactPeople.status" />}
                        name="inactive"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <FieldLanguage
                        labelId="ui-organizations.contactPeople.language"
                        name="language"
                      />
                    </Col>
                    <Col xs={3}>
                      <CategoryDropdown
                        ariaLabelledBy="nameFormCategoriesLabel"
                        dropdownVendorCategories={categories}
                      />
                    </Col>
                    <Col xs={6}>
                      <Field
                        component={TextArea}
                        fullWidth
                        label={<FormattedMessage id="ui-organizations.contactPeople.note" />}
                        name="notes"
                      />
                    </Col>
                  </Row>
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.EMAILS}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.EMAILS]}
                >
                  <Row>
                    <Col
                      data-test-email-form
                      xs={12}
                    >
                      <EmailForm
                        categories={categories}
                      />
                    </Col>
                  </Row>
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.PHONES}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.PHONES]}
                >
                  <Row>
                    <Col
                      data-test-phone-form
                      xs={12}
                    >
                      <PhoneForm
                        categories={categories}
                        phoneTypesList={phoneTypesList}
                      />
                    </Col>
                  </Row>
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.URLS}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.URLS]}
                >
                  <Row>
                    <Col
                      data-test-url-form
                      xs={12}
                    >
                      <UrlForm
                        categories={categories}
                      />
                    </Col>
                  </Row>
                </Accordion>

                <Accordion
                  id={CONTACT_PERSON_ACCORDIONS.ADDRESSES}
                  label={CONTACT_PERSON_ACCORDION_LABELS[CONTACT_PERSON_ACCORDIONS.ADDRESSES]}
                >
                  <Row>
                    <Col
                      data-test-address-form
                      xs={12}
                    >
                      <AddressInfo
                        dropdownVendorCategories={categories}
                      />
                    </Col>
                  </Row>
                </Accordion>
              </AccordionSet>
            </AccordionStatus>
          </Col>
        </Row>
      </Pane>
    </HasCommand>
  );
};

EditContact.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  paneTitle: PropTypes.node.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default stripesForm({
  enableReinitialize: true,
  navigationCheck: true,
})(EditContact);
