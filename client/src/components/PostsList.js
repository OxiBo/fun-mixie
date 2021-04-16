import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postsPerPage } from "../utils/variables";
import { fetchPosts } from "../actions";

import Pagination from "./Pagination";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

import {
  selectPosts,
  selectPostsError,
  selectPostsTotal,
} from "./selectors/posts";

import useFetchData from "./customHooks/useFetchData";

const PostList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const onPageChange = (currentPage) => {
    setPage(currentPage);
  };

  // fetches posts on page load and page number change
  useEffect(() => {
    dispatch(fetchPosts(page, postsPerPage));
  }, [page]);

  const { data, error, loading } = useFetchData(selectPosts, selectPostsError);

  const renderPosts = () => {
    return data.map((post) => (
      <li key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </li>
    ));
  };

  const {
    data: postsTotal,
    error: errorTotal,
    loading: loadingTotalPosts,
  } = useFetchData(selectPostsTotal, selectPostsError);
  console.log(postsTotal);
  return (
    <div className="posts__list">
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        data && data.length && <ul>{renderPosts()}</ul>
      )}

      <Pagination
        perPage={postsPerPage}
        total={postsTotal} // {data && data.total} //data.total
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PostList;
