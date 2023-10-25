import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';

import {
  Button,
  Col,
  Headline,
  Loading,
  Pane,
  RadioButton,
  RadioButtonGroup,
  Row,
} from '@folio/stripes/components';
import { useShowCallout } from '@folio/stripes-acq-components';
import { useOkapiKy } from '@folio/stripes/core';

import { useBankingInformation } from '../hooks';
import { SETTINGS_API } from '../constants';

const BankingInformationSettings = () => {
  const {
    enabled,
    key,
    id: bankingInformationId,
    isLoading,
    refetch,
  } = useBankingInformation();
  const ky = useOkapiKy();
  const sendCallout = useShowCallout();

  const onSubmit = async ({ value }) => {
    try {
      await ky.put(`${SETTINGS_API}/${bankingInformationId}`, {
        json: { value, key },
      });

      refetch();
      sendCallout({
        message: <FormattedMessage id="ui-organizations.settings.accountTypes.save.success.message" />,
      });
    } catch (error) {
      sendCallout({
        type: 'error',
        message: <FormattedMessage id="settings.accountTypes.save.error.generic.message" />,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Pane
      defaultWidth="fill"
      id="banking-information"
      paneTitle={<FormattedMessage id="ui-organizations.settings.bankingInformation" />}
    >
      <Row>
        <Col xs={12}>
          <Headline margin="none">
            <FormattedMessage id="ui-organizations.settings.bankingInformation" />
          </Headline>
        </Col>
        <Col xs={12}>
          <Form
            onSubmit={onSubmit}
            initialValues={{ value: enabled }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="value"
                  component={RadioButtonGroup}
                >
                  <RadioButton
                    label={<FormattedMessage id="ui-organizations.settings.bankingInformation.enabled" />}
                    id="enabled"
                    value="true"
                  />
                  <RadioButton
                    label={<FormattedMessage id="ui-organizations.settings.bankingInformation.disabled" />}
                    id="disabled"
                    value="false"
                  />
                </Field>
                <Button type="submit" buttonStyle="primary">
                  <FormattedMessage id="ui-organizations.settings.accountTypes.save.button" />
                </Button>
              </form>
            )}
          />
        </Col>
      </Row>
    </Pane>
  );
};

export default BankingInformationSettings;
