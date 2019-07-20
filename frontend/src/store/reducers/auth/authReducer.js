import {
  AUTH_START,
  AUTH_END,
  AUTH_FAIL,
  AUTH_SUCCESS,
  CLEAN_UP,
  SIGN_OUT,
} from '../../actions/auth/authTypes';

const initState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  error: null,
  loading: false,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case AUTH_START:
      return {
        ...state,
        loading: true
      };

    case AUTH_END:
      return {
        ...state,
        loading: false
      };

    case AUTH_FAIL:
      return {
        ...state,
        error: payload
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        token: payload.token,
        error: false
      };

    case SIGN_OUT:
      return {
        ...state,
        token: null,
        error: false
      };

    case CLEAN_UP:
      return {
        ...state,
        error: null,
        loading: false
      };

    default:
      return state;
  }
}

export default authReducer;