import { FormattedMessage } from 'react-intl';
import {
  Field,
  useForm,
} from 'react-final-form';

import {
  Accordion,
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import {
  isTransmissionMethodEmail,
  validateEmailAddress,
} from '../../utils';

// TODO: Replace with actual API call when backend is ready
const mockTemplates = [
  { value: '', label: '' },
  { value: 'template-1', label: 'Email Template 1' },
  { value: 'template-2', label: 'Email Template 2' },
];

export const EmailForm = () => {
  const { getState } = useForm();

  const isMethodEmail = isTransmissionMethodEmail(getState()?.values);

  return (
    <Accordion
      id="email"
      label={<FormattedMessage id="ui-organizations.integration.email" />}
    >
      <Row>
        <Col
          data-test-email-address
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.email.emailAddress" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediEmail.emailTo"
            type="email"
            component={TextField}
            fullWidth
            required={isMethodEmail}
            validate={validateEmailAddress}
            validateFields={[]}
          />
        </Col>
        <Col
          data-test-email-template
          xs={6}
          md={3}
        >
          <Field
            label={<FormattedMessage id="ui-organizations.integration.email.emailTemplate" />}
            name="exportTypeSpecificParameters.vendorEdiOrdersExportConfig.ediEmail.emailTemplate"
            component={Select}
            dataOptions={mockTemplates}
            fullWidth
            validateFields={[]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};
