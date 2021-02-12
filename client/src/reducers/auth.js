import { FETCH_USER, AUTH_ERROR } from "../actions/types";

const defaultAuthState = {
  user: null,
  authError: "",
};

const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        authError: "",
        user: action.payload || null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
        user: null,
      };
    default: {
      return state;
    }
  }
};


export default authReducer