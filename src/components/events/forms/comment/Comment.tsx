import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventCommentsState, CommentsState } from '../../../../recoil/atoms/comments';
import { getToken } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import { EventCommentDto } from '../../../../repositories/types';

export interface Props {
  eventId: string;
}

const CommentForm: React.FC<Props> = ({ eventId }) => {
  const [comments, setComments] = useRecoilState<CommentsState>(eventCommentsState);
  const [comment, setComment] = useState<EventCommentDto>({ comment: '' });
  const token = useRecoilValue(getToken);

  const addComment = async () => {
    try {
      if (token) {
        const eventRepo = repoFactory('eventRepository');
        const response = await eventRepo.addEventComment(token, '', comment);
        if (response) {
          const eventComments = comments.eventComments.find((eventComment) => eventComment.eventId === eventId);
          if (eventComments) {
            eventComments.comments.push({ ...response.data });
            setComments({ ...comments });
          } else {
            const newComments = [...comments.eventComments];
            newComments.push({ eventId, comments: [{ ...response.data }] });
            setComments({ ...comments, ...newComments });
          }
        }
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const commentOnChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setComment({ ...comment, [target.name]: target.value });
  };

  return (
    <article className="comment-form">
      <div className="comment-form__header"></div>
      <div className="comment-form__content">
        <label htmlFor="comment" data-test="label-comment-content">
          Comment
        </label>
        <textarea
          name="comment"
          className="comment-form__text-area"
          onChange={commentOnChangeHandler}
          data-test="text-area-comment"
        ></textarea>
      </div>
      <div className="comment-form__cta">
        <button className="comment-form__cta__btn" onClick={addComment} data-test="btn-add-comment">
          Add Comment
        </button>
      </div>
    </article>
  );
};

export default CommentForm;
