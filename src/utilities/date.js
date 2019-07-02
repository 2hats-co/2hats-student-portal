import moment from 'moment';

export const getPrettyDateString = date => {
  const momentDate = moment(date);

  // Show year if not the same as current
  if (momentDate.year !== moment().year) return momentDate.format('D MMM Y');

  // Otherwise, show only day & month
  return momentDate.format('D MMM');
};
