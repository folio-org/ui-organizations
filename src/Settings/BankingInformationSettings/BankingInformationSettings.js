import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';

import {
  Button,
  Checkbox,
  Col,
  Headline,
  Pane,
  RadioButton,
  RadioButtonGroup,
  Row,
} from '@folio/stripes/components';

const BankingInformationSettings = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Pane
      defaultWidth="fill"
      dismissible
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
            initialValues={{ enabled: false }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="enabled"
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
                <Button type="submit" buttonStyle="primary">Save</Button>
              </form>
            )}
          />
        </Col>
      </Row>
    </Pane>
  );
};

export default BankingInformationSettings;
