import moment from 'moment';

export default function(value: Date): string {
  if (!value) {
    return '';
  }
  const date = moment(value);
  return date.fromNow();
}
