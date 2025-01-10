import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  SERVICE_INTERACTION_API,
  SERVICE_INTERACTION_NUMBER_GENERATOR_SEQUENCES_API,
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
              <p><FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.info" /></p>
              <p>
                <FormattedMessage
                  id="ui-organizations.settings.numberGeneratorOptions.infoAdditional"
                  values={{
                    serviceInteractionLink: (
                      <Link to={SERVICE_INTERACTION_API}>
                        <FormattedMessage id="stripes-core.settings" />{' > '}
                        <FormattedMessage id="ui-service-interaction.meta.title" />
                      </Link>
                    ),
                    numberGeneratorSequencesLink: (
                      <Link to={SERVICE_INTERACTION_NUMBER_GENERATOR_SEQUENCES_API}>
                        <FormattedMessage id="stripes-core.settings" />{' > '}
                        <FormattedMessage id="ui-service-interaction.meta.title" />{' > '}
                        <FormattedMessage id="ui-service-interaction.settings.numberGeneratorSequences" />
                      </Link>
                    ),
                  }}
                />
              </p>
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
