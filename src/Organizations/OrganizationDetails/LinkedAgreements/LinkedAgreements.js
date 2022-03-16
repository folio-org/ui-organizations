import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Accordion,
  Loading,
  MultiColumnList,
  NoValue,
  TextLink,
} from '@folio/stripes/components';
import {
  FolioFormattedDate,
  PrevNextPagination,
} from '@folio/stripes-acq-components';

import { useLinkedAgreements } from '../../../common/hooks';
import {
  AGREEMENTS_LIST_COLUMNS,
  AGREEMENTS_LIST_COLUMNS_MAPPING,
  AGREEMENTS_LIST_VISIBLE_COLUMNS,
} from './constants';

const RESULT_COUNT_INCREMENT = 30;

const formatter = {
  [AGREEMENTS_LIST_COLUMNS.name]: agreement => (
    <TextLink to={`/erm/agreements/${agreement.id}`}>
      {agreement.name}
    </TextLink>
  ),
  [AGREEMENTS_LIST_COLUMNS.startDate]: agreement => <FolioFormattedDate value={agreement.startDate} />,
  [AGREEMENTS_LIST_COLUMNS.endDate]: agreement => <FolioFormattedDate value={agreement.endDate} />,
  [AGREEMENTS_LIST_COLUMNS.agreementStatus]: agreement => agreement.agreementStatus?.label || <NoValue />,
};

export const LinkedAgreements = ({
  id,
  label,
  organization,
}) => {
  const [pagination, setPagination] = useState({ limit: RESULT_COUNT_INCREMENT, offset: 0 });
  const {
    agreements,
    isFetching,
    isLoading,
    totalCount,
  } = useLinkedAgreements(
    organization?.id,
    pagination,
  );

  if (isLoading) return <Loading />;

  return (
    totalCount > 0 && (
      <Accordion
        id={id}
        label={label}
      >
        <>
          <MultiColumnList
            id={`${id}-list`}
            columnIdPrefix="linked-agreements"
            columnMapping={AGREEMENTS_LIST_COLUMNS_MAPPING}
            contentData={agreements}
            formatter={formatter}
            interactive={false}
            loading={isFetching}
            totalCount={totalCount}
            visibleColumns={AGREEMENTS_LIST_VISIBLE_COLUMNS}
          />
          <PrevNextPagination
            {...pagination}
            totalCount={totalCount}
            disabled={isFetching}
            onChange={setPagination}
          />
        </>
      </Accordion>
    )
  );
};

LinkedAgreements.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  organization: PropTypes.object.isRequired,
};
