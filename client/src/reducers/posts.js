import { SINGLE_POST, SINGLE_POST_ERROR } from "../actions/types";

const defaultAuthState = {
  singlePost: null,
  singlePostError: false,
};

const postsReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case SINGLE_POST:
      return {
        ...state,
        singlePost: action.payload || null,
        singlePostError: false,
      };
    case SINGLE_POST_ERROR:
      return {
        ...state,
        singlePost: null,
        singlePostError: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default postsReducer;
