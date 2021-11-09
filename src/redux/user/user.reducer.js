import UserActionTypes from "./user.types";

const INITAL_STATE = {
  token: null,
  user: null,
  error: null,
  isWrongAccount: false,
  isInvalidEmail: false,
  isLoading: false,
};

const userReducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.REGISTER_REQUEST:
      return {
        ...INITAL_STATE,
        isLoading: true,
      };
    case UserActionTypes.EMAIL_LOGIN_REQUEST:
      return {
        ...INITAL_STATE,
        isLoading: true,
      };
    case UserActionTypes.REGISTER_SUCCESS:
      return {
        ...INITAL_STATE,
      };
    case UserActionTypes.EMAIL_LOGIN_SUCCESS:
      return {
        ...INITAL_STATE,
        user: payload.user,
        token: payload.token,
      };
    case UserActionTypes.EMAIL_LOGIN_FAILURE:
      if (payload.response.status === 400)
        return {
          ...INITAL_STATE,
          isWrongAccount: true,
        };
      else {
        return {
          ...INITAL_STATE,
          error: payload,
        };
      }
    case UserActionTypes.REGISTER_FAILURE:
      if (payload.response.status === 400)
        return {
          ...INITAL_STATE,
          isInvalidEmail: true,
        };
      else {
        return {
          ...INITAL_STATE,
          error: payload,
        };
      }
    case UserActionTypes.LOGOUT:
      return {
        ...INITAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
