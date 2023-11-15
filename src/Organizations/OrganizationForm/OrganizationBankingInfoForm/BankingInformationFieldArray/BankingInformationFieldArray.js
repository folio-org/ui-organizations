import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-final-form';

import { RepeatableFieldWithValidation } from '@folio/stripes-acq-components';

import { EVENT_EMITTER_EVENTS } from '../../../../common/constants';
import { useEventEmitter } from '../../../../common/hooks';
import { getAddressCategoryIdsSet } from '../../getAddressCategoryIdsSet';

export const BankingInformationFieldArray = (props) => {
  const { fields } = props;
  const eventEmitter = useEventEmitter();
  const { change, getFieldState } = useForm();

  /*
    Handles organization addresses categories change.
    Resets banking information address category fields without initial value.
  */
  useEffect(() => {
    const eventType = EVENT_EMITTER_EVENTS.ADDRESS_CATEGORY_CHANGED;
    const callback = () => {
      const addressesCategoriesIdsMap = getAddressCategoryIdsSet(getFieldState('addresses').value);

      fields.forEach(field => {
        const fieldName = `${field}.categoryId`;
        const { initial, value } = getFieldState(fieldName);

        if (!addressesCategoriesIdsMap.has(value) && value !== initial) {
          change(fieldName, undefined);
        }
      });
    };

    eventEmitter.on(eventType, callback);

    return () => {
      eventEmitter.off(eventType, callback);
    };
  }, [change, eventEmitter, fields, getFieldState]);

  return <RepeatableFieldWithValidation {...props} />;
};

BankingInformationFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
};
