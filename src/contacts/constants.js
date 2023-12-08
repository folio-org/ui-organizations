import React from 'react';
import { FormattedMessage } from 'react-intl';

export const CONTACT_PERSON_ACCORDIONS = {
  NAME: 'contact-name',
  EMAILS: 'contact-emails',
  PHONES: 'contact-phones',
  URLS: 'contact-urls',
  ADDRESSES: 'contact-addresses',
};

export const CONTACT_PERSON_ACCORDION_LABELS = {
  [CONTACT_PERSON_ACCORDIONS.NAME]: <FormattedMessage id="ui-organizations.contactPeople.name" />,
  [CONTACT_PERSON_ACCORDIONS.EMAILS]: <FormattedMessage id="ui-organizations.contactPeople.emails" />,
  [CONTACT_PERSON_ACCORDIONS.PHONES]: <FormattedMessage id="ui-organizations.contactPeople.phoneNumbers" />,
  [CONTACT_PERSON_ACCORDIONS.URLS]: <FormattedMessage id="ui-organizations.contactPeople.urls" />,
  [CONTACT_PERSON_ACCORDIONS.ADDRESSES]: <FormattedMessage id="ui-organizations.contactPeople.addresses" />,
};

export const PRIVILEGED_CONTACT_URL_PATH = 'privileged-contacts';
