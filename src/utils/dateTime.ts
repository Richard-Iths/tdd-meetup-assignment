import moment from 'moment';

export const formatDate = (date: string) => moment(date).format('MMMM DD YYYY');
export const isPastDate = (date: string, checkDate: string) => moment(date).add(1, 'd').diff(moment(checkDate)) >= 0;
export const diffDates = (date: string, diffDate: string) => moment(date).diff(diffDate);
