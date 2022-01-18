import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  token: null,
  user: null,
  error: null,
  isInvalidEmail: false,
  isLoading: false,
  isUpdating: false,
  isFetchingNotification: false,
  notificationError: null,
  notifications: [],
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.REGISTER_REQUEST:
      return {
        ...INITIAL_STATE,
        isLoading: true,
      };
    case UserActionTypes.EMAIL_LOGIN_REQUEST:
    case UserActionTypes.GOOGLE_LOGIN_REQUEST:
      return {
        ...INITIAL_STATE,
        isLoading: true,
      };
    case UserActionTypes.REGISTER_SUCCESS:
      return {
        ...INITIAL_STATE,
      };
    case UserActionTypes.EMAIL_LOGIN_SUCCESS:
    case UserActionTypes.GOOGLE_LOGIN_SUCCESS:
      return {
        ...INITIAL_STATE,
        user: payload.user,
        token: payload.token,
      };

    case UserActionTypes.EMAIL_LOGIN_FAILURE:
    case UserActionTypes.GOOGLE_LOGIN_FAILURE:
      return {
        ...INITIAL_STATE,
        error: payload.response.data.message,
      };

    case UserActionTypes.REGISTER_FAILURE:
      if (payload.response.status === 400)
        return {
          ...INITIAL_STATE,
          isInvalidEmail: true,
        };
      else {
        return {
          ...INITIAL_STATE,
          error: payload,
        };
      }
    case UserActionTypes.LOGOUT:
      return {
        ...INITIAL_STATE,
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
    case UserActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case UserActionTypes.FETCH_NOTIFICATION_REQUEST:
      return {
        ...state,
        isFetchingNotification: true,
      };
    case UserActionTypes.FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isFetchingNotification: false,
        notifications: payload,
        notificationError: null,
      };
    case UserActionTypes.FETCH_NOTIFICATION_FAILURE:
      return {
        ...state,
        isFetchingNotification: false,
        notificationError: payload.response.data.message,
      };
    case UserActionTypes.NOTIFY_GRADE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UserActionTypes.NOTIFY_GRADE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case UserActionTypes.NOTIFY_GRADE_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload.response.data.message,
      };
    default:
      return state;
  }
};

export default userReducer;
