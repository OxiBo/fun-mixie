import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetchData from "./customHooks/useFetchData";
import { fetchPost } from "../actions";

import { selectSinglePost, selectSinglePostError } from "./selectors/posts";
const SinglePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const postId = history.location.pathname.split("/").slice(-1)[0];
    dispatch(fetchPost(postId));
  }, []);

  const data = useFetchData(selectSinglePost, selectSinglePostError);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div>single post</div>;
};

export default SinglePost;
