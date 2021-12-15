import { atom } from 'recoil';
export interface UserState {
  token: string | null;
}
export const userState = atom<UserState>({
  key: 'userState',
  default: {
    token: null,
  },
});
