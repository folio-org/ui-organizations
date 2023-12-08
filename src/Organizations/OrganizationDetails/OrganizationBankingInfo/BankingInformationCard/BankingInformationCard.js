import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  KeyValue,
  LayoutHeader,
  Row,
} from '@folio/stripes/components';

const invalidReference = <FormattedMessage id="stripes-acq-components.invalidReference" />;

export const BankingInformationCard = ({
  bankingAccountTypesMap,
  bankingInformation,
  categoriesMap,
}) => {
  const {
    isPrimary,
    bankName,
    bankAccountNumber,
    transitNumber,
    categoryId,
    accountTypeId,
    notes,
  } = bankingInformation;

  const renderHeader = useCallback(() => (
    <LayoutHeader
      level={4}
      title={<FormattedMessage id={`ui-organizations.${isPrimary ? 'primaryItem' : 'alternateItem'}`} />}
      noActions
    />
  ), [isPrimary]);

  return (
    <Card headerComponent={renderHeader}>
      <Row>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.bankName" />}
            value={bankName}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.bankAccountNumber" />}
            value={bankAccountNumber}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.transitNumber" />}
            value={transitNumber}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.addressCategory" />}
            value={categoryId && (categoriesMap[categoryId]?.value ?? invalidReference)}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.accountType" />}
            value={accountTypeId && (bankingAccountTypesMap[accountTypeId]?.name ?? invalidReference)}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="ui-organizations.data.bankingInformation.notes" />}
            value={notes}
          />
        </Col>
      </Row>
    </Card>
  );
};

BankingInformationCard.propTypes = {
  bankingAccountTypesMap: PropTypes.object.isRequired,
  bankingInformation: PropTypes.shape({
    isPrimary: PropTypes.bool,
    bankName: PropTypes.string,
    bankAccountNumber: PropTypes.string,
    transitNumber: PropTypes.string,
    categoryId: PropTypes.string,
    accountTypeId: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  categoriesMap: PropTypes.object.isRequired,
};
