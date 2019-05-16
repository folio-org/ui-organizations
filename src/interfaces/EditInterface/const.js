import PropTypes from 'prop-types';

export const formatDD = [
  { label: '', value: '' },
  { label: 'Counter', value: 'Counter' },
  { label: 'Delimited', value: 'delimited' },
  { label: 'Excel', value: 'excel' },
  { label: 'PDF', value: 'pdf' },
  { label: 'ASCII', value: 'ascii' },
  { label: 'HTML', value: 'html' },
  { label: 'Other', value: 'other' },
];

export const deliveryMethodDD = [
  { label: '', value: '' },
  { label: 'Online', value: 'Online' },
  { label: 'FTP', value: 'FTP' },
  { label: 'Email', value: 'Email' },
  { label: 'Other', value: 'Other' },
];

export const shapeOptions = PropTypes.arrayOf(PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}));
