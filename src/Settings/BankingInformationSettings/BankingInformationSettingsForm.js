import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Checkbox,
  Col,
  Pane,
  PaneFooter,
  PaneHeader,
  Row,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/final-form';

const BankingInformationSettingsForm = ({
  handleSubmit,
  pristine,
  submitting,
}) => {
  const paneFooter = useMemo(() => {
    const end = (
      <Button
        id="clickable-save-contact-person-footer"
        type="submit"
        buttonStyle="primary mega"
        disabled={pristine || submitting}
        onClick={handleSubmit}
      >
        <FormattedMessage id="ui-organizations.settings.accountTypes.save.button" />
      </Button>
    );

    return <PaneFooter renderEnd={end} />;
  }, [handleSubmit, pristine, submitting]);

  const paneTitle = <FormattedMessage id="ui-organizations.settings.bankingInformation" />;

  return (
    <Pane
      defaultWidth="fill"
      id="banking-information"
      renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle={paneTitle} />}
      footer={paneFooter}
    >
      <Row>
        <Col xs={12}>
          <Field
            component={Checkbox}
            label={<FormattedMessage id="ui-organizations.settings.bankingInformation" />}
            name="value"
            type="checkbox"
          />
        </Col>
      </Row>
    </Pane>
  );
};

BankingInformationSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  renderHeader: PropTypes.func,
};

export default stripesForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  subscription: { values: true },
})(BankingInformationSettingsForm);
