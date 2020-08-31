import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Checkbox,
  Col,
  ConfirmationModal,
  RepeatableField,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import {
  AcqUnitsField,
  validateRequired,
} from '@folio/stripes-acq-components';

import { ORGANIZATION_STATUS } from '../../../common/constants';
import { FieldLanguage } from '../../../common/components';
import {
  CREATE_UNITS_PERM,
  MANAGE_UNITS_PERM,
} from '../../constants';
import resetVendorFields from './resetVendorFields';

function OrganizationSummaryForm({ dispatchChange, initialValues }) {
  const [isVendorUncheckConfirm, setVendorUncheckConfirm] = useState(false);

  const renderAlias = useCallback((elem) => {
    return (
      <Row>
        <Col xs>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.alias" />}
            name={`${elem}.value`}
            required
            validate={[validateRequired]}
          />
        </Col>
        <Col xs>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            name={`${elem}.description`}
          />
        </Col>
      </Row>
    );
  }, []);

  const hideVendorUncheckConfirm = useCallback(() => {
    setVendorUncheckConfirm(false);
    dispatchChange('isVendor', true);
  }, [dispatchChange]);

  const onResetVendorFields = useCallback(() => {
    resetVendorFields.forEach(field => dispatchChange(field, null));
  }, [dispatchChange]);

  const handleVendorUncheck = useCallback(() => {
    setVendorUncheckConfirm(false);
    onResetVendorFields();
  }, [onResetVendorFields]);

  const onChangeIsVendor = useCallback((e, value) => {
    if (initialValues.id && !value) setVendorUncheckConfirm(true);
  }, [initialValues.id]);

  const isEditMode = Boolean(initialValues.id);

  return (
    <Row>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={TextField}
          fullWidth
          id="name"
          label={<FormattedMessage id="ui-organizations.summary.name" />}
          name="name"
          required
          validate={[validateRequired]}
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={TextField}
          fullWidth
          label={<FormattedMessage id="ui-organizations.summary.code" />}
          name="code"
          required
          validate={validateRequired}
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={TextField}
          fullWidth
          label={<FormattedMessage id="ui-organizations.summary.accountingCode" />}
          name="erpCode"
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={Select}
          fullWidth
          label={<FormattedMessage id="ui-organizations.summary.organizationStatus" />}
          name="status"
          placeholder=" "
          required
          validate={[validateRequired]}
        >
          {Object.keys(ORGANIZATION_STATUS).map((key) => (
            <FormattedMessage
              id={`ui-organizations.organizationStatus.${key}`}
              key={key}
            >
              {(message) => <option value={ORGANIZATION_STATUS[key]}>{message}</option>}
            </FormattedMessage>
          ))}
        </Field>
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <FieldLanguage
          labelId="ui-organizations.summary.defaultLanguage"
          name="language"
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          component={Checkbox}
          label={<FormattedMessage id="ui-organizations.summary.isVendor" />}
          name="isVendor"
          type="checkbox"
          onChange={onChangeIsVendor}
          vertical
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <AcqUnitsField
          id="org-acq-units"
          name="acqUnitIds"
          perm={isEditMode ? MANAGE_UNITS_PERM : CREATE_UNITS_PERM}
          isEdit={isEditMode}
          preselectedUnits={initialValues.acqUnitIds}
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <Field
          label={<FormattedMessage id="ui-organizations.summary.description" />}
          name="description"
          component={TextArea}
        />
      </Col>
      <Col xs={6}>
        <FieldArray
          addLabel={<FormattedMessage id="ui-organizations.summary.add" />}
          component={RepeatableField}
          id="aliases"
          legend={<FormattedMessage id="ui-organizations.summary.alternativeNames" />}
          name="aliases"
          renderField={renderAlias}
        />
      </Col>

      {isVendorUncheckConfirm && (
        <ConfirmationModal
          id="uncheck-is-vendor-confirmation"
          confirmLabel={<FormattedMessage id="ui-organizations.vendor.confirmation.confirm" />}
          heading={<FormattedMessage id="ui-organizations.vendor.confirmation.heading" />}
          message={<FormattedMessage id="ui-organizations.vendor.confirmation.message" />}
          onCancel={hideVendorUncheckConfirm}
          onConfirm={handleVendorUncheck}
          open
        />
      )}
    </Row>
  );
}

OrganizationSummaryForm.propTypes = {
  dispatchChange: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default OrganizationSummaryForm;
