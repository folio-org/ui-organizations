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
import { BankingInformationField } from './BankingInformationField';

const renderField = (props) => (name, index, fields) => (
  <BankingInformationField
    {...props}
    name={name}
    index={index}
    fields={fields}
  />
);

export const OrganizationBankingInfoForm = () => {
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
      name="bankingInformation"
      onAdd={createAddNewItem()}
      onRemove={removeItem}
      renderField={renderField({ bankingAccountTypeOptions })}
      validate={validatePrimary}
    />
  );
};
