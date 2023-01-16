import moment from 'moment';

export const formatDate = (ts: string | number | undefined) => {
  if (!ts) {
    return '';
  }

  return moment(ts).format('DD/MM/YY h:mm:ss a');
};
