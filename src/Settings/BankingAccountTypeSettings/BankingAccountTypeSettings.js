import { FormattedMessage } from 'react-intl';

import { getControlledVocabTranslations } from '@folio/stripes-acq-components';
import { useStripes } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';

import { BANKING_ACCOUNT_TYPES_API } from '../../common/constants';

const setUniqValidation = (value, index, items) => {
  const errors = {};

  const isBankingAccountTypeExist = items.some(({ id, name }) => {
    return name?.toLowerCase() === value?.name?.toLowerCase() && id !== value?.id;
  });

  if (isBankingAccountTypeExist) {
    errors.name = <FormattedMessage id="ui-organizations.settings.accountTypes.save.error.accountTypeMustBeUnique" />;
  }

  return errors;
};

const BankingAccountTypeSettings = () => {
  const stripes = useStripes();
  const ConnectedComponent = stripes.connect(ControlledVocab);

  const columnMapping = {
    name: <FormattedMessage id="ui-organizations.settings.accountTypes.name" />,
    action: <FormattedMessage id="ui-organizations.settings.accountTypes.action" />,
  };

  const hasEditPerms = stripes.hasPerm('ui-organizations.settings');
  const actionSuppressor = {
    edit: () => !hasEditPerms,
    delete: () => !hasEditPerms,
  };

  return (
    <ConnectedComponent
      actionSuppressor={actionSuppressor}
      canCreate={hasEditPerms}
      stripes={stripes}
      baseUrl={BANKING_ACCOUNT_TYPES_API}
      records="bankingAccountTypes"
      label={<FormattedMessage id="ui-organizations.settings.bankingAccountTypes" />}
      translations={getControlledVocabTranslations('ui-organizations.settings.bankingAccountTypes')}
      objectLabel="BankingAccountTypes"
      visibleFields={['name']}
      columnMapping={columnMapping}
      hiddenFields={['lastUpdated', 'numberOfObjects']}
      nameKey="bankingAccountTypes"
      id="bankingAccountTypes"
      validate={setUniqValidation}
      sortby="name"
    />
  );
};

export default BankingAccountTypeSettings;
