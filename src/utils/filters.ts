import { Event } from '../models';
import { diffDates } from './dateTime';
export enum Filter {
  DATE_ASC = 'dateAsc',
  DATE_DESC = 'dateDesc',
}
export const filterEvents = (events: Event[], filterType: Filter): Event[] => {
  switch (filterType) {
    case Filter.DATE_ASC: {
      return events.sort((a, b) => diffDates(a.date, b.date));
    }
    case Filter.DATE_DESC: {
      return events.sort((a, b) => diffDates(b.date, a.date));
    }
    default: {
      return [...events];
    }
  }
};
