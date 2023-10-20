import { FormattedMessage } from 'react-intl';

import { stripesConnect, stripesShape } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { getControlledVocabTranslations } from '@folio/stripes-acq-components';

import { BANKING_ACCOUNT_TYPES_API } from '../constants';

const BankingAccountTypeSettings = ({ stripes }) => {
  const ConnectedComponent = stripes.connect(ControlledVocab);

  const columnMapping = {
    value: <FormattedMessage id="ui-organizations.settings.name" />,
    action: <FormattedMessage id="ui-organizations.settings.action" />,
  };

  const hasEditPerms = stripes.hasPerm('ui-organizations.settings');
  const actionSuppressor = {
    edit: () => !hasEditPerms,
    delete: () => !hasEditPerms,
  };

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

BankingAccountTypeSettings.propTypes = {
  stripes: stripesShape.isRequired,
};

export default stripesConnect(BankingAccountTypeSettings);
