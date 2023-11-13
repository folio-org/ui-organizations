import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Loading } from '@folio/stripes/components';
import { RepeatableFieldWithValidation } from '@folio/stripes-acq-components';

import { useBankingAccountTypes } from '../../../common/hooks';
import {
  createAddNewItem,
  removeItem,
} from '../../../common/utils';
import { validatePrimary } from '../../../common/validation';
import { BANKING_INFORMATION_FIELD_NAME } from '../../constants';
import { BankingInformationField } from './BankingInformationField';

const renderField = (props) => (name, index, fields) => (
  <BankingInformationField
    {...props}
    name={name}
    index={index}
    fields={fields}
  />
);

export const OrganizationBankingInfoForm = ({ organizationId }) => {
  const {
    bankingAccountTypes,
    isFetching,
  } = useBankingAccountTypes();

  const bankingAccountTypeOptions = useMemo(() => {
    return bankingAccountTypes.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [bankingAccountTypes]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <FieldArray
      addLabel={<FormattedMessage id="ui-organizations.button.bankingInformation.add" />}
      component={RepeatableFieldWithValidation}
      id="bankingInformation"
      name={BANKING_INFORMATION_FIELD_NAME}
      onAdd={createAddNewItem(null, { organizationId })}
      onRemove={removeItem}
      renderField={renderField({ bankingAccountTypeOptions })}
      validate={validatePrimary}
    />
  );
};

OrganizationBankingInfoForm.propTypes = {
  organizationId: PropTypes.string.isRequired,
};
