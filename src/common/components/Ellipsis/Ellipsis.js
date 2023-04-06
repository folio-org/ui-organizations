import PropTypes from 'prop-types';

import { NoValue } from '@folio/stripes/components';

import css from './Ellipsis.css';

const getClassName = (...classNames) => classNames.filter(Boolean).join(' ');

export const Ellipsis = ({
  children,
  className,
  value,
}) => {
  const displayValue = children ?? value;

  return (
    <span
      className={getClassName(css.text, className)}
      title={displayValue}
    >
      {displayValue || <NoValue />}
    </span>
  );
};

Ellipsis.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
};
