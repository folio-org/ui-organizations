import React, { useCallback } from 'react';
import {
  Field,
  useForm,
} from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { NumberGeneratorModalButton } from '@folio/service-interaction';
import { stripesConnect } from '@folio/stripes/core';
import {
  Col,
  Row,
  TextField,
} from '@folio/stripes/components';

import { VENDOR_CODE_GENERATOR_CODE } from '../../../../common/constants';
import { useVendorCodeGeneratorSettings } from '../../../../common/hooks';
import { fetchOrgsByParam } from '../../../../common/resources';
import { validateOrgCode } from './validateOrgCode';

const FieldCode = ({ orgId, mutator }) => {
  const { change, resetFieldState } = useForm();
  const { isUseGenerator, isUseBoth } = useVendorCodeGeneratorSettings();

  const validate = useCallback(value => {
    return validateOrgCode(mutator.fetchOrgByCode, orgId, value);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [orgId]);

  const handleGeneratedValue = useCallback((generatedValue) => {
    change('code', generatedValue);
    resetFieldState('code');
  }, [change, resetFieldState]);

  return (
    <Row>
      <Col xs={12}>
        <Field
          component={TextField}
          disabled={isUseGenerator}
          fullWidth
          label={<FormattedMessage id="ui-organizations.summary.code" />}
          name="code"
          required
          validate={validate}
        />
      </Col>
      {(isUseGenerator || isUseBoth) && (
        <Col xs={12}>
          <NumberGeneratorModalButton
            buttonLabel={<FormattedMessage id="ui-organizations.numberGenerator.generateVendorCode" />}
            callback={handleGeneratedValue}
            generateButtonLabel={<FormattedMessage id="ui-organizations.numberGenerator.generateVendorCode" />}
            generator={VENDOR_CODE_GENERATOR_CODE}
            id="vendor-code-generator"
            modalProps={{
              label: <FormattedMessage id="ui-organizations.numberGenerator.vendorCodeGenerator" />,
            }}
          />
        </Col>
      )}
    </Row>
  );
};

FieldCode.manifest = Object.freeze({
  fetchOrgByCode: fetchOrgsByParam,
});

FieldCode.propTypes = {
  mutator: PropTypes.object.isRequired,
  orgId: PropTypes.string,
};

export default stripesConnect(FieldCode);
