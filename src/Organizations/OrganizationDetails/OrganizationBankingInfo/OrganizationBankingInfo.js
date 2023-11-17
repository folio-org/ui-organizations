import keyBy from 'lodash/keyBy';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { Loading } from '@folio/stripes/components';

import {
  useBankingAccountTypes,
  useCategories,
  useOrganizationBankingInformation,
} from '../../../common/hooks';
import { BankingInformationCard } from './BankingInformationCard';

export const OrganizationBankingInfo = ({ organization }) => {
  const {
    bankingInformation,
    isFetching: isBankingInformationFetching,
  } = useOrganizationBankingInformation(organization.id);

  const {
    categories,
    isFetching: isCategoriesFetching,
  } = useCategories();

  const {
    bankingAccountTypes,
    isFetching: isBankingAccountTypesFetching,
  } = useBankingAccountTypes();

  const categoriesMap = useMemo(() => keyBy(categories, 'id'), [categories]);
  const bankingAccountTypesMap = useMemo(() => keyBy(bankingAccountTypes, 'id'), [bankingAccountTypes]);

  const isFetching = (
    isBankingInformationFetching
    || isCategoriesFetching
    || isBankingAccountTypesFetching
  );

  if (isFetching) return <Loading />;

  return bankingInformation.map(info => (
    <BankingInformationCard
      key={info.id}
      bankingInformation={info}
      bankingAccountTypesMap={bankingAccountTypesMap}
      categoriesMap={categoriesMap}
    />
  ));
};

OrganizationBankingInfo.propTypes = {
  organization: PropTypes.object.isRequired,
};
