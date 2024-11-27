import {
  useCallback,
  useContext,
} from 'react';

import { DefaultMCLRowFormatter } from '@folio/stripes/components';
import { VersionViewContext } from '@folio/stripes-acq-components';

import css from './styles.css';

const getVersionWrappedRowFormatter = ({
  baseRowFormatter = DefaultMCLRowFormatter,
  row,
  name,
  paths,
}) => {
  const {
    rowClass,
    rowIndex,
    ...props
  } = row;

  const isUpdated = paths?.includes(`${name}[${rowIndex}]`);

  return baseRowFormatter({
    ...props,
    rowClass: [
      css['version-wrapped'],
      css['version-row-formatted'],
      rowClass,
      isUpdated ? css.mark : '',
    ].join(' '),
    rowIndex,
  });
};

export const useVersionWrappedRowFormatter = ({
  baseRowFormatter,
  name,
}) => {
  const versionContext = useContext(VersionViewContext);

  const rowFormatter = useCallback((row) => {
    if (!versionContext || !name) return baseRowFormatter;

    return getVersionWrappedRowFormatter({
      baseRowFormatter,
      row,
      name,
      paths: versionContext.paths,
    });
  }, [baseRowFormatter, name, versionContext]);

  return rowFormatter;
};
