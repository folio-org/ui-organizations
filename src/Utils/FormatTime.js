import moment from 'moment-timezone';
import _ from 'lodash';

const FormatTime = (data, type) => {
  const date = ((((data || {}).edi || {}).ediJob || {}).date || {});
  const time = ((((data || {}).edi || {}).ediJob || {}).time || {});
  const dateFormat = 'YYYY-MM-DDThh:mm:ss.SSSZ';
  const timezone = moment.tz.guess();

  if (time.length > 0 && !_.isEmpty(time)) {
    if (type === 'post') {
      const newDate = (date.length > 0 && !_.isEmpty(date))
        ? moment(date).format(dateFormat)
        : moment().tz(timezone).format(dateFormat);
      const parseDate = newDate.split('T');
      const parseTimeZone = parseDate[1].split('.');
      const curDate = parseDate[0];
      const curTimeZone = parseTimeZone[1];

      if (time.toString().includes('T')) {
        const checkTime = time.split('T');
        const splitTime = checkTime[1].split('.');
        const getTime = splitTime[0];
        const converTime = getTime.toUpperCase().includes('AM') || getTime.toUpperCase().includes('PM') ? moment(getTime, 'h:mm:ss A').format('HH:mm:ss') : getTime;
        const getDate = `${curDate}T${converTime}.${curTimeZone}`;

        return getDate;
      } else {
        const parseTime = time.split('.');
        const curTime = parseTime[0];
        const converTime = curTime.toUpperCase().includes('AM') || curTime.toUpperCase().includes('PM') ? moment(curTime, 'h:mm:ss A').format('HH:mm:ss') : curTime;
        const getDate = `${curDate}T${converTime}.${curTimeZone}`;

        return getDate;
      }
    }

    if (type === 'get') {
      if (!time.toString().includes('T')) return false;
      const newTime = moment(time).tz(timezone).format('h:mm A.ZZ');

      return newTime;
    }

    return false;
  }

  return false;
};

export default FormatTime;
