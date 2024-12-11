import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  MessageBanner,
  Pane,
  PaneFooter,
  PaneHeader,
  RadioButton,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import css from './NumberGeneratorSettingsForm.css';
import {
  VENDOR_CODE_GENERATOR_OPTIONS,
  VENDOR_CODE_GENERATOR_SETTINGS_KEY,
} from '../../common/constants/numberGenerator';

const NumberGeneratorSettingsForm = ({ handleSubmit, pristine, submitting }) => {
  const paneHeader = (renderProps) => (
    <PaneHeader
      {...renderProps}
      paneTitle={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions" />}
    />
  );

  const paneFooter = (
    <PaneFooter
      renderEnd={
        <Button
          buttonStyle="primary mega"
          disabled={pristine || submitting}
          id="clickable-save-number-generator-settings"
          onClick={handleSubmit}
          type="submit"
        >
          <FormattedMessage id="stripes-core.button.save" />
        </Button>
      }
    />
  );

  return (
    <Pane defaultWidth="fill" footer={paneFooter} id="vendor-code-settings" renderHeader={paneHeader}>
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
    </Pane>
  );
};

NumberGeneratorSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default stripesFinalForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
})(NumberGeneratorSettingsForm);
