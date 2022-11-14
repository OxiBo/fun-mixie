import React from "react";

const PostItem = ({ post: { _id, title, body, author } }) => {
  return (
    <li key={_id} className="post__item">
      <div className="post_item-author">
        <h4 className="post_item-author-name">{author}</h4>
      </div>
      <div className="post__item-content">
        <h2 className="post_item-title">{title}</h2>
        <p className="post_item-body">{body}</p>
      </div>
      <div className="post__item-actions">
        <div className="post__item-actions-likes">2 likes</div>
        <div className="post__item-actions-comment">add comment</div>
        <div className="post__item-actions-save">save button</div>
      </div>
    </li>
  );
};

export default PostItem;
