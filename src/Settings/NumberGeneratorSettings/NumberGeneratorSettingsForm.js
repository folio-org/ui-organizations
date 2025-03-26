import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field } from 'react-final-form';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  Button,
  Col,
  MessageBanner,
  Pane,
  PaneFooter,
  PaneHeader,
  Row,
  Select,
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
  const intl = useIntl();

  const getTranslatedDataOptions = (field) => {
    return field.map(item => ({
      label: item.value ? intl.formatMessage({ id: `ui-organizations.settings.numberGeneratorOptions.${item.value}` }) : '',
      value: item.value,
    }));
  };

  const dataOptionsTranslated = getTranslatedDataOptions(VENDOR_CODE_GENERATOR_OPTIONS);

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
            component={Select}
            dataOptions={dataOptionsTranslated}
            id={VENDOR_CODE_GENERATOR_SETTINGS_KEY}
            label={<FormattedMessage id="ui-organizations.settings.numberGeneratorOptions.code" />}
            name={VENDOR_CODE_GENERATOR_SETTINGS_KEY}
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
