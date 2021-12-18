import { atom } from 'recoil';
import { Event } from '../../models';
interface EventState {
  events: Event[];
}

export const eventState = atom<EventState>({
  key: 'eventState',
  default: {
    events: [],
  },
});
