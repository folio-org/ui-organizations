import React, { useCallback } from 'react';
import { Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import { Col, Row, TextField } from '@folio/stripes/components';
import { NumberGeneratorButton } from '@folio/service-interaction';

import { fetchOrgsByParam } from '../../../../common/resources';
import { validateOrgCode } from './validateOrgCode';
import { useSettings } from '../../../../common/hooks';

const CONFIG_NAME = 'number_generator';

const FieldCode = ({ orgId, mutator }) => {
  const validate = useCallback(value => {
    return validateOrgCode(mutator.fetchOrgByCode, orgId, value);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [orgId]);

  const { change } = useForm();

  const { settings } = useSettings([CONFIG_NAME]);
  const vendorCodeSetting = settings?.find(sett => sett?.configName === CONFIG_NAME)?.parsedSettings?.vendorGeneratorSetting ?? 'useTextField';

  return (
    <Row>
      <Col xs={12}>
        <Field
          component={TextField}
          disabled={vendorCodeSetting === 'useGenerator'}
          fullWidth
          label={<FormattedMessage id="ui-organizations.summary.code" />}
          name="code"
          required
          validate={validate}
        />
      </Col>
      {(
        vendorCodeSetting === 'useGenerator' ||
        vendorCodeSetting === 'useBoth'
      ) &&
        <Col xs={12}>
          <NumberGeneratorButton
            callback={(generated) => change('code', generated)}
            id="vendor-code-generator"
            generator="Vendor"
            sequence="vendor"
          />
        </Col>
      }
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
