import UserActionTypes from "./user.types";

const INITAL_STATE = {
  token: null,
  user: null,
  error: null,
  isWrongAccount: false,
  isLoading: false,
};

const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.EMAIL_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.EMAIL_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isWrongAccount: false,
        isLoading: false,
      };
    case UserActionTypes.EMAIL_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isWrongAccount: true,
        isLoading: false,
      };
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
