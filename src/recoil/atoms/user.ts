import { atom, selector } from 'recoil';
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

export const getToken = selector({
  key: 'getToken',
  get: ({ get }) => {
    const token = get(userState).token;
    if (token) {
      return token;
    }
  },
});
