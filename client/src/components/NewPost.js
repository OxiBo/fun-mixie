import React from "react";
import { useDispatch } from "react-redux";

import { createPost } from "../actions";
const NewPost = () => {
  const dispatch = useDispatch();

  return (
    <div className="new__post">
      <h2 className="new__post-heading heading-secondary">Create new post</h2>
      <form
        action=""
        className="new__post-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            createPost({
              title: "created from action",
              body: "sldjfalksjdflaksdjflksdjf",
            })
          );
        }}
      >
        <div className="new__post-form-field new__post-form-field-title">
          <label htmlFor="title" className="new__post-form-field-title-label">
            Title
          </label>
          <input type="text" className="new__post-form-field-title-input" />
        </div>
        <button type="submit" className="new__post-form-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPost;
