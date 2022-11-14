import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postsPerPage } from "../utils/variables";
import { fetchPosts } from "../actions";

import Pagination from "./Pagination";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import PostItem from "./PostItem";

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
    return data.map((post) => <PostItem key={post._id} post={post} />);
  };

  const {
    data: postsTotal,
    error: errorTotal,
    loading: loadingTotalPosts,
  } = useFetchData(selectPostsTotal, selectPostsError);
  console.log(postsTotal);
  return (
    <div className="posts">
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        data &&
        data.length > 0 && (
          <>
            <ul className="posts__list">{renderPosts()}</ul>
          </>
        )
      )}
      {data && data.length > 0 && (
        <Pagination
          perPage={postsPerPage}
          total={postsTotal} // {data && data.total} //data.total
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default PostList;
