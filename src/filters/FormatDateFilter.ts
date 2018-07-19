import moment from 'moment';

export default function(value: Date): string {
  if (!value) {
    return '';
  }
  // let date = moment(value, 'MMM DD, YYYY hh:mm a');
  const date = moment(value);
  return date.fromNow();
}
