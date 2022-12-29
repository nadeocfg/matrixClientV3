import moment from 'moment';

export const formatDate = (ts: string | number) => {
  return moment(ts).format('DD/MM/YY HH:mm:ss');
};
