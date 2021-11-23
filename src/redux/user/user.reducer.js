import UserActionTypes from "./user.types";

const INITAL_STATE = {
  token: null,
  user: null,
  error: null,
  isInvalidEmail: false,
  isLoading: false,
  isUpdating: false,
};

const userReducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.REGISTER_REQUEST:
      return {
        ...INITAL_STATE,
        isLoading: true,
      };
    case UserActionTypes.EMAIL_LOGIN_REQUEST:
    case UserActionTypes.GOOGLE_LOGIN_REQUEST:
      return {
        ...INITAL_STATE,
        isLoading: true,
      };
    case UserActionTypes.REGISTER_SUCCESS:
      return {
        ...INITAL_STATE,
      };
    case UserActionTypes.EMAIL_LOGIN_SUCCESS:
    case UserActionTypes.GOOGLE_LOGIN_SUCCESS:
      return {
        ...INITAL_STATE,
        user: payload.user,
        token: payload.token,
      };
    case UserActionTypes.EMAIL_LOGIN_FAILURE:
    case UserActionTypes.GOOGLE_LOGIN_FAILURE:
      return {
        ...INITAL_STATE,
        error: payload.response.data.message,
      };

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
    case UserActionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    case UserActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        user: payload,
        error: null,
      };
    case UserActionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: payload.response.data.message,
      };
    default:
      return state;
  }
};

export default userReducer;
