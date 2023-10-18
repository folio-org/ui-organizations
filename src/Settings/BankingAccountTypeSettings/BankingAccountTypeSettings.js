import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { stripesShape } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { getControlledVocabTranslations } from '@folio/stripes-acq-components';

class BankingAccountTypeSettings extends Component {
  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { stripes } = this.props;
    const columnMapping = {
      value: <FormattedMessage id="ui-organizations.settings.name" />,
      action: <FormattedMessage id="ui-organizations.settings.action" />,
    };

    const hasEditPerms = stripes.hasPerm('ui-organizations.settings');
    const actionSuppressor = {
      edit: () => !hasEditPerms,
      delete: () => !hasEditPerms,
    };

    const ConnectedComponent = this.connectedControlledVocab;

    const setUniqValidation = (value, index, items) => {
      const errors = {};

      const isAccountTypeExist = items.some(({ id, name }) => {
        return name?.toLowerCase() === value?.name?.toLowerCase() && id !== value?.id;
      });

      if (isAccountTypeExist) {
        errors.name = <FormattedMessage id="ui-organizations.settings.accountTypes.save.error.accountTypeMustBeUnique" />;
      }

      return errors;
    };

    return (
      <ConnectedComponent
        actionSuppressor={actionSuppressor}
        canCreate={hasEditPerms}
        stripes={stripes}
        baseUrl="organizations-storage/banking-account-types"
        records="bankingAccountTypes"
        label={<FormattedMessage id="ui-organizations.settings.accountTypes" />}
        translations={getControlledVocabTranslations('ui-organizations.settings.accountTypes')}
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
  }
}

BankingAccountTypeSettings.propTypes = {
  stripes: stripesShape.isRequired,
};

export default BankingAccountTypeSettings;
