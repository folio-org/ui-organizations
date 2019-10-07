import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { LayoutHeader } from '@folio/stripes/components';

import css from './ContactPersonItem.css';

const ContactPersonItem = ({ children, isPrimary }) => {
  const title = <FormattedMessage id={`ui-organizations.${isPrimary ? 'primaryItem' : 'alternateItem'}`} />;

  return (
    <div className={css.contactPersonItem}>
      <LayoutHeader level={5} title={title} noActions />
      <div className={css.contactPersonItemContent}>
        {children}
      </div>
    </div>
  );
};

ContactPersonItem.propTypes = {
  isPrimary: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ContactPersonItem.defaultProps = {
  isPrimary: false,
};

export default ContactPersonItem;
