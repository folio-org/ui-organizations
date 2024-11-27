import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { VersionViewContext } from '@folio/stripes-acq-components';

import css from './ContactCardHeaderVersionView.css';

export const ContactCardHeaderVersionView = ({ isPrimary, name }) => {
  const versionContext = useContext(VersionViewContext);

  const isUpdated = versionContext?.paths?.includes(name);

  const headerStart = (
    <h4 className={css.cardHeader}>
      <span className={isUpdated ? css.mark : ''}>
        <FormattedMessage id={`ui-organizations.${isPrimary ? 'primaryItem' : 'alternateItem'}`} />
      </span>
    </h4>
  );

  return headerStart;
};

ContactCardHeaderVersionView.propTypes = {
  isPrimary: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
