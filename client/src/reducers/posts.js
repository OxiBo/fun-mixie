import {
  SINGLE_POST,
  SINGLE_POST_ERROR,
  FETCH_POSTS,
  FETCH_POSTS_ERROR,
} from "../actions/types";

const defaultAuthState = {
  singlePost: null,
  singlePostError: false,
  posts: null,
  postsError: false,
  postsTotal: null,
};

const postsReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case SINGLE_POST:
      return {
        ...state,
        singlePost: action.payload,
        singlePostError: false,
      };
    case SINGLE_POST_ERROR:
      return {
        ...state,
        singlePost: null,
        singlePostError: action.payload,
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        postsTotal: action.payload.totalCount,
        postsError: false,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        posts: null,
        postsTotal: null,
        postsError: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default postsReducer;
