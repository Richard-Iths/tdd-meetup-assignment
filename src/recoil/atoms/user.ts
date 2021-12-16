import { atom } from 'recoil';
import { Event } from '../../models';
export interface UserState {
  token: string | null;
  attendingEvents: Event[];
  administratedEvents: Event[];
}
export const userState = atom<UserState>({
  key: 'userState',
  default: {
    token: null,
    attendingEvents: [],
    administratedEvents: [],
  },
});
