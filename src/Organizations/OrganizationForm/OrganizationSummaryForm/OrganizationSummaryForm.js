import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

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
import { asyncValidate } from '../asyncValidate';

function OrganizationSummaryForm({ change, initialValues, fetchOrgByCode, formValues }) {
  const [isVendorUncheckConfirm, setVendorUncheckConfirm] = useState(false);

  const renderAlias = useCallback((elem) => {
    return (
      <Row>
        <Col
          xs
          data-test-alias
        >
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.alias" />}
            name={`${elem}.value`}
            required
            validate={validateRequired}
            validateFields={[]}
          />
        </Col>
        <Col xs>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-organizations.summary.description" />}
            name={`${elem}.description`}
            validateFields={[]}
          />
        </Col>
      </Row>
    );
  }, []);

  const hideVendorUncheckConfirm = useCallback(() => {
    setVendorUncheckConfirm(false);
    change('isVendor', true);
  }, [change]);

  const onResetVendorFields = useCallback(() => {
    resetVendorFields.forEach(field => change(field, null));
  }, [change]);

  const handleVendorUncheck = useCallback(() => {
    setVendorUncheckConfirm(false);
    onResetVendorFields();
  }, [onResetVendorFields]);

  const onChangeIsVendor = useCallback(({ target: { checked } }) => {
    change('isVendor', checked);

    if (initialValues.id && !checked) setVendorUncheckConfirm(true);
  }, [initialValues.id, change]);

  const validateOrgCode = useCallback(async value => {
    const errorRequired = validateRequired(value);

    if (errorRequired) {
      return errorRequired;
    }

    const existingCodes = await asyncValidate(fetchOrgByCode, formValues);

    if (existingCodes.length) return <FormattedMessage id="ui-organizations.save.error.codeInUse" />;

    return undefined;
  }, [fetchOrgByCode, formValues]);

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
          validate={validateRequired}
          validateFields={[]}
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
          validate={validateOrgCode}
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
          validateFields={[]}
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
          validate={validateRequired}
          validateFields={[]}
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
          validateFields={[]}
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
          isFinal
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
          validateFields={[]}
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
  change: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  fetchOrgByCode: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
};

export default OrganizationSummaryForm;
