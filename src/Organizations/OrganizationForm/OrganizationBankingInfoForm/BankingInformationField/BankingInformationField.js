import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  Row,
  TextField,
} from '@folio/stripes/components';
import { FieldSelectionFinal } from '@folio/stripes-acq-components';

import { FieldIsPrimary } from '../../../../common/components';

export const BankingInformationField = ({
  categoriesOptions,
  bankingAccountTypeOptions,
  fields,
  index,
  name,
}) => {
  const cardHeader = (
    <FieldIsPrimary
      fields={fields}
      fieldIndex={index}
      fieldPrefix={name}
      labelId="ui-organizations.data.bankingInformation.isPrimary"
    />
  );

  return (
    <Card headerStart={cardHeader}>
      <Row>
        <Col xs={12} md={4}>
          <Field
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.bankName" />}
            name={`${name}.bankName`}
            component={TextField}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col xs={12} md={4}>
          <Field
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.bankAccountNumber" />}
            name={`${name}.bankAccountNumber`}
            component={TextField}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col xs={12} md={4}>
          <Field
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.transitNumber" />}
            name={`${name}.transitNumber`}
            component={TextField}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col xs={12} md={4}>
          <FieldSelectionFinal
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.address" />}
            name={`${name}.addressId`}
            dataOptions={categoriesOptions}
            validateFields={[]}
          />
        </Col>
        <Col xs={12} md={4}>
          <FieldSelectionFinal
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.accountType" />}
            name={`${name}.accountTypeId`}
            dataOptions={bankingAccountTypeOptions}
            fullWidth
            validateFields={[]}
          />
        </Col>
        <Col xs={12} md={4}>
          <Field
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.notes" />}
            name={`${name}.notes`}
            id={`${name}.notes`}
            component={TextField}
            fullWidth
            validateFields={[]}
          />
        </Col>
      </Row>
    </Card>
  );
};

BankingInformationField.propTypes = {
  bankingAccountTypeOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  categoriesOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  fields: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
