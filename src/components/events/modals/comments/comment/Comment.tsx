import React from 'react';
import { EventComment } from '../../../../../models';
export interface Props extends EventComment {
  event_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  name: string;
}
const Comment: React.FC<Props> = ({ comment, created_at, event_id, name, updated_at }) => {
  return (
    <article className="comment" data-test="component-comment">
      <div className="comment__header">
        <span className="comment_name" data-test="comment-name">
          {name}
        </span>
        <span className="comment__created-at" data-test="comment-created-at">
          {created_at.toString()}
        </span>
      </div>
      <div className="comment__content">
        <p className="comment__text" data-test="comment-text">
          {comment}
        </p>
      </div>
    </article>
  );
};

export default Comment;
