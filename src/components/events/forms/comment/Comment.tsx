import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventCommentsState, CommentsState } from '../../../../recoil/atoms/comments';
import { getToken } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import { EventCommentDto } from '../../../../repositories/types';
import './comment.styles.scss';

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
        const response = await eventRepo.addEventComment(token, eventId, comment);
        if (response) {
          const newEventsComments = comments.eventComments.map((eventComment) => {
            if (eventComment.eventId === eventId) {
              const newComments = [...eventComment.comments, { ...response.data }];
              return { ...eventComment, comments: [...newComments] };
            }
            return eventComment;
          });
          setComments({ ...comments, eventComments: [...newEventsComments] });
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
    <article className="comment-form fade-in-animation" data-test="form-comment">
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
          id="comment-text-area"
        ></textarea>
      </div>
      <div className="comment-form__cta">
        <i className="ri-add-box-fill icon" onClick={addComment} data-test="btn-add-comment">
          <h4 className="icon__label">Add Comment</h4>
        </i>
      </div>
    </article>
  );
};

export default CommentForm;
