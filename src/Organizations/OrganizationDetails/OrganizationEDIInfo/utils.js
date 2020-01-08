import { find } from 'lodash';

export const ediCodeTypeOptions = [
  { label: '31B (US-SAN)', value: '31B/US-SAN' },
  { label: '014 (EAN)', value: '014/EAN' },
  { label: '091 (Supplier-assigned ID)', value: '091/Vendor-assigned' },
  { label: '092 (Library-assigned ID)', value: '092/Customer-assigned' },
];

export const getEDITypeLabel = (ediType) => {
  if (!ediType) return '';

  const obj = find(ediCodeTypeOptions, { value: ediType });

  if (!obj) return '';

  return obj.label;
};
