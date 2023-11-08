import { FormattedMessage } from 'react-intl';

import { useShowCallout } from '@folio/stripes-acq-components';
import { Loading } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import { SETTINGS_API } from '../../common/constants';
import { useBankingInformation } from '../../common/hooks';
import BankingInformationSettingsForm from './BankingInformationSettingsForm';

const BankingInformationSettings = () => {
  const {
    enabled,
    bankingInformation,
    isLoading,
    refetch,
  } = useBankingInformation();
  const ky = useOkapiKy();
  const sendCallout = useShowCallout();

  const onSubmit = async ({ value }) => {
    try {
      await ky.put(`${SETTINGS_API}/${bankingInformation.id}`, {
        json: { ...bankingInformation, value },
      });

      refetch();
      sendCallout({
        message: <FormattedMessage id="ui-organizations.settings.accountTypes.save.success.message" />,
      });
    } catch (error) {
      sendCallout({
        type: 'error',
        message: <FormattedMessage id="ui-organizations.settings.accountTypes.save.error.generic.message" />,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BankingInformationSettingsForm
      onSubmit={onSubmit}
      initialValues={{ value: enabled }}
    />
  );
};

export default BankingInformationSettings;
