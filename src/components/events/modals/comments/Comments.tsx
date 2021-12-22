import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EventComment } from '../../../../models';
import { eventCommentsState } from '../../../../recoil/atoms/comments';
import { userState } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';
import Comment from './comment/Comment';
import './comment.styles.scss';
import CommentForm from '../../forms/comment/Comment';
export interface Props extends IBaseModal {
  eventId: string;
}

const CommentsModal: React.FC<Props> = ({ eventId, modalRef, visible, closeModal }) => {
  const [comments, setComments] = useRecoilState(eventCommentsState);
  const [user] = useRecoilState(userState);
  const [eventComments, setEventComments] = useState<EventComment[]>([]);
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  useEffect(() => {
    if (showAddComment) {
      const textArea = document.querySelector<HTMLTextAreaElement>('#comment-text-area');
      if (textArea) {
        textArea.focus();
      }
    }
  }, [showAddComment]);

  useEffect(() => {
    const body = document.querySelector('body')!;
    if (visible && !body.classList.contains('no-scroll')) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [visible]);

  useEffect(() => {
    const getEventComments = async () => {
      const eventRepository = repoFactory('eventRepository');
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
  }, [comments]);

  const toggleShowAddComment = () => {
    setShowAddComment(!showAddComment);
  };
  const reverseComments = () => eventComments.reverse();

  return (
    <BaseModal {...{ modalRef, visible, closeModal }} title="Comments">
      <section className="comments-modal" data-test="comments-modal">
        {user.token && (
          <div className="comments-modal__cta">
            <button className="comments-modal__btn" data-test="btn-new-comment" onClick={toggleShowAddComment}>
              New Comment
            </button>
            {showAddComment && <CommentForm eventId={eventId} />}
          </div>
        )}
        {eventComments.length > 0 &&
          reverseComments().map((eventComment, index) => <Comment {...eventComment} key={index} />)}
      </section>
    </BaseModal>
  );
};

export default CommentsModal;
