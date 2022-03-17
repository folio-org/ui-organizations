import { FormattedMessage } from 'react-intl';

export const AGREEMENTS_LIST_COLUMNS = {
  name: 'name',
  startDate: 'startDate',
  endDate: 'endDate',
  agreementStatus: 'agreementStatus',
};

export const AGREEMENTS_LIST_VISIBLE_COLUMNS = [
  AGREEMENTS_LIST_COLUMNS.name,
  AGREEMENTS_LIST_COLUMNS.startDate,
  AGREEMENTS_LIST_COLUMNS.endDate,
  AGREEMENTS_LIST_COLUMNS.agreementStatus,
];

export const AGREEMENTS_LIST_COLUMNS_MAPPING = {
  [AGREEMENTS_LIST_COLUMNS.name]: <FormattedMessage id="ui-organizations.linkedAgreements.agreement.name" />,
  [AGREEMENTS_LIST_COLUMNS.startDate]: <FormattedMessage id="ui-organizations.linkedAgreements.agreement.startDate" />,
  [AGREEMENTS_LIST_COLUMNS.endDate]: <FormattedMessage id="ui-organizations.linkedAgreements.agreement.endDate" />,
  [AGREEMENTS_LIST_COLUMNS.agreementStatus]: <FormattedMessage id="ui-organizations.linkedAgreements.agreement.agreementStatus" />,
};
