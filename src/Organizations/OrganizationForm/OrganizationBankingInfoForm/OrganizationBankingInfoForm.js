import { useMemo } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Loading } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

import {
  useBankingAccountTypes,
  useCategories,
} from '../../../common/hooks';
import {
  createAddNewItem,
  removeItem,
} from '../../../common/utils';
import { validatePrimary } from '../../../common/validation';
import { BANKING_INFORMATION_FIELD_NAME } from '../../constants';
import { BankingInformationField } from './BankingInformationField';
import { BankingInformationFieldArray } from './BankingInformationFieldArray';

const renderField = (props) => (name, index, fields) => (
  <BankingInformationField
    {...props}
    name={name}
    index={index}
    fields={fields}
  />
);

export const OrganizationBankingInfoForm = () => {
  const stripes = useStripes();

  const {
    bankingAccountTypes,
    isFetching: isBankingAccountTypesFetching,
  } = useBankingAccountTypes();

  const {
    categories,
    isFetching: isCategoriesFetching,
  } = useCategories();

  const bankingAccountTypeOptions = useMemo(() => {
    return bankingAccountTypes.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [bankingAccountTypes]);

  const isLoading = isBankingAccountTypesFetching || isCategoriesFetching;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FieldArray
      addLabel={<FormattedMessage id="ui-organizations.button.bankingInformation.add" />}
      component={BankingInformationFieldArray}
      canRemove={stripes.hasPerm('ui-organizations.banking-information.delete')}
      id="bankingInformation"
      name={BANKING_INFORMATION_FIELD_NAME}
      onAdd={createAddNewItem()}
      onRemove={removeItem}
      renderField={renderField({
        bankingAccountTypeOptions,
        categories,
      })}
      validate={validatePrimary}
    />
  );
};
