import { atom } from 'recoil';
import { EventComment } from '../../models';
type CommentEvent = { eventId: string; comments: EventComment[] };
export interface CommentsState {
  eventComments: CommentEvent[];
}
export const eventCommentsState = atom<CommentsState>({
  key: 'eventCommentsState',
  default: {
    eventComments: [],
  },
});
