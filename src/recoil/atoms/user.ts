import { atom } from 'recoil';
import { Event } from '../../models';
export interface UserState {
  token: string | null;
  attendingEvents: Event[];
}
export const userState = atom<UserState>({
  key: 'userState',
  default: {
    token: process.env.NODE_ENV === 'test' ? '123' : null,
    attendingEvents: [],
  },
});
