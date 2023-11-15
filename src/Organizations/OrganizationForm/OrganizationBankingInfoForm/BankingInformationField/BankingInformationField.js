import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  Row,
  TextField,
} from '@folio/stripes/components';
import { FieldSelectionFinal } from '@folio/stripes-acq-components';

import { FieldIsPrimary } from '../../../../common/components';
import { getAddressCategoryIdsSet } from '../../getAddressCategoryIdsSet';

export const BankingInformationField = ({
  bankingAccountTypeOptions,
  categories,
  fields,
  index,
  name,
}) => {
  const { getFieldState } = useForm();

  const initCategoryId = getFieldState(`${name}.categoryId`)?.initial;
  const addresses = getFieldState('addresses')?.value;
  const addressCategoryIdsSet = useMemo(() => {
    return getAddressCategoryIdsSet(addresses);
  }, [addresses]);

  const cardHeader = (
    <FieldIsPrimary
      fields={fields}
      fieldIndex={index}
      fieldPrefix={name}
      labelId="ui-organizations.data.bankingInformation.isPrimary"
    />
  );

  const categoriesOptions = useMemo(() => {
    return categories.reduce((acc, { id, value }) => {
      if (addressCategoryIdsSet.has(id) || id === initCategoryId) {
        acc.push({ label: value, value: id });
      }

      return acc;
    }, []);
  }, [addressCategoryIdsSet, categories, initCategoryId]);

  return (
    <Card
      headerStart={cardHeader}
      data-testid="banking-information-card"
    >
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
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.addressCategory" />}
            name={`${name}.categoryId`}
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
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  fields: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
