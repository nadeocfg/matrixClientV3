import moment from 'moment';

const formatTime = (time: string | number | undefined): string => {
  if (!time) {
    return '';
  }

  const momentDate = moment(time);

  if (momentDate.isValid()) {
    return momentDate.format('h:mm a');
  }

  return time + '';
};

export default formatTime;
