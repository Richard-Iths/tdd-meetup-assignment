import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EventComment } from '../../../../models';
import { eventCommentsState } from '../../../../recoil/atoms/comments';
import { userState } from '../../../../recoil/atoms/user';
import EventsRepository from '../../../../repositories/events';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';
import Comment from './comment/Comment';
export interface Props extends IBaseModal {
  eventId: string;
}

const CommentsModal: React.FC<Props> = ({ eventId, modalRef, visible, closeModal }) => {
  const [comments, setComments] = useRecoilState(eventCommentsState);
  const [user] = useRecoilState(userState);
  const [eventComments, setEventComments] = useState<EventComment[]>([]);

  useEffect(() => {
    const getEventComments = async () => {
      const eventRepository = new EventsRepository();
      const response = await eventRepository.getEventComments(eventId);
      if (response) {
        setEventComments([...response.data]);
        setComments({
          ...comments,
          eventComments: [...comments.eventComments, { eventId, comments: [...response.data] }],
        });
      }
    };

    const existingComments = comments.eventComments.find((event) => event.eventId === eventId);
    if (!existingComments) {
      getEventComments();
    } else {
      setEventComments([...existingComments.comments]);
    }
  }, []);

  return (
    <BaseModal {...{ modalRef, visible, closeModal }}>
      <section className="comments-modal" data-test="comments-modal">
        {user.token && (
          <div className="comments__cta">
            <button className="comments__btn" data-test="btn-new-comment">
              New Comment
            </button>
          </div>
        )}
        {eventComments.length > 0 &&
          eventComments.map((eventComment, index) => <Comment {...eventComment} key={index} />)}
      </section>
    </BaseModal>
  );
};

export default CommentsModal;
