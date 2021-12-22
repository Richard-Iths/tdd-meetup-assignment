import React from 'react';
import { EventComment } from '../../../../../models';
import './comment.styles.scss';
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
        <h4 className="comment_name" data-test="comment-name">
          {name}
        </h4>
        <h4 className="comment__created-at" data-test="comment-created-at">
          {created_at.toString().split('GMT')[0]}
        </h4>
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
