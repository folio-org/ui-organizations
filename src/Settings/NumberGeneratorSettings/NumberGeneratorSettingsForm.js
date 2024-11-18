import { useMemo } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  MessageBanner,
  RadioButton,
  Row,
} from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import css from './NumberGeneratorSettingsForm.css';
import {
  VENDOR_CODE_GENERATOR_OPTIONS,
  VENDOR_CODE_GENERATOR_SETTINGS_KEY,
  VENDOR_CODE_GENERATOR_SETTINGS_SCOPE,
} from '../../common/constants/numberGenerator';

export const NumberGeneratorSettingsForm = () => {
  const stripes = useStripes();
  const ConnectedConfigManager = useMemo(() => stripes.connect(ConfigManager), [stripes]);

  const beforeSave = (data) => data[VENDOR_CODE_GENERATOR_SETTINGS_KEY] || '';
  const getInitialValues = (items) => ({ [VENDOR_CODE_GENERATOR_SETTINGS_KEY]: items?.[0]?.value || '' });

  return (
    <ConnectedConfigManager
      configName={VENDOR_CODE_GENERATOR_SETTINGS_KEY}
      formType="final-form"
      getInitialValues={getInitialValues}
      label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions" />}
      onBeforeSave={beforeSave}
      scope={VENDOR_CODE_GENERATOR_SETTINGS_SCOPE}
      stripes={stripes}
    >
      <Row>
        <Col xs={12}>
          <div className={css.marginBottomGutter}>
            <MessageBanner>
              <FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.info" />
            </MessageBanner>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            component={RadioButton}
            id={VENDOR_CODE_GENERATOR_OPTIONS.TEXTFIELD}
            label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.useTextFieldForVendor" />}
            name={VENDOR_CODE_GENERATOR_SETTINGS_KEY}
            type="radio"
            value={VENDOR_CODE_GENERATOR_OPTIONS.TEXTFIELD}
          />
          <Field
            component={RadioButton}
            id={VENDOR_CODE_GENERATOR_OPTIONS.BOTH}
            label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.useBothForVendor" />}
            name={VENDOR_CODE_GENERATOR_SETTINGS_KEY}
            type="radio"
            value={VENDOR_CODE_GENERATOR_OPTIONS.BOTH}
          />
          <Field
            component={RadioButton}
            id={VENDOR_CODE_GENERATOR_OPTIONS.GENERATOR}
            label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.useGeneratorForVendor" />}
            name={VENDOR_CODE_GENERATOR_SETTINGS_KEY}
            type="radio"
            value={VENDOR_CODE_GENERATOR_OPTIONS.GENERATOR}
          />
        </Col>
      </Row>
    </ConnectedConfigManager>
  );
};
