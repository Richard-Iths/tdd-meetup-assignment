import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { Event } from '../../models';
export interface EventState {
  events: Event[];
  searchText: string;
}

export const eventState = atom<EventState>({
  key: 'eventState',
  default: {
    events: [],
    searchText: '',
  },
});

export const searchState = selector({
  key: 'searchState',
  get: ({ get }) => {
    const state = get(eventState);
    if (state.searchText) {
      const newArr = state.events.filter((event) =>
        event.name.toLocaleLowerCase().includes(state.searchText.toLowerCase())
      );
      return [...newArr];
    }
    return [...state.events];
  },
});
