import UserActionTypes from "./user.types";
import {
  userLoginService,
  userRegisterService,
  updateProfileService,
  googleLoginService,
  fetchNotificationsService,
  readNotificationService,
  replyAGradeReviewByIDService,
  notifyGradeReviewService,
} from "./user.services";
import {
  clearClassrooms,
  fetchClassroomsFailure,
} from "../classrooms/classrooms.actions";

export const emailLoginRequest = () => ({
  type: UserActionTypes.EMAIL_LOGIN_REQUEST,
});

export const emailLoginSuccess = (user, token) => ({
  type: UserActionTypes.EMAIL_LOGIN_SUCCESS,
  payload: { user, token },
});

export const emailLoginFailure = (error) => ({
  type: UserActionTypes.EMAIL_LOGIN_FAILURE,
  payload: error,
});

export const userLogin = (email, password) => {
  return (dispatch) => {
    dispatch(emailLoginRequest());
    userLoginService(email, password)
      .then((data) => dispatch(emailLoginSuccess(data.user, data.token)))
      .catch((error) => dispatch(emailLoginFailure(error)));
  };
};

//----------------------------------------------------------------------//
export const googleLoginRequest = () => ({
  type: UserActionTypes.GOOGLE_LOGIN_REQUEST,
});

export const googleLoginSuccess = (user, token) => ({
  type: UserActionTypes.GOOGLE_LOGIN_SUCCESS,
  payload: { user, token },
});

export const googleLoginFailure = (error) => ({
  type: UserActionTypes.GOOGLE_LOGIN_FAILURE,
  payload: error,
});

export const googleLogin = (tokenId) => {
  return (dispatch) => {
    dispatch(googleLoginRequest());
    googleLoginService(tokenId)
      .then(({ data }) => {
        dispatch(googleLoginSuccess(data.user, data.token));
      })
      .catch((error) => dispatch(googleLoginFailure(error)));
  };
};

//----------------------------------------------------------------------//

export const logout = () => ({
  type: UserActionTypes.LOGOUT,
});

export const userLogout = () => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(clearClassrooms());
    dispatch(fetchClassroomsFailure(null));
  };
};

//----------------------------------------------------------------------//

export const clearError = () => ({
  type: UserActionTypes.CLEAR_ERROR,
});

//----------------------------------------------------------------------//

export const registerRequest = () => ({
  type: UserActionTypes.REGISTER_REQUEST,
});

export const registerSuccess = () => ({
  type: UserActionTypes.REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
  type: UserActionTypes.REGISTER_FAILURE,
  payload: error,
});

export const userRegister = (email, password, fullname) => {
  return (dispatch) => {
    dispatch(registerRequest());
    userRegisterService(email, password, fullname)
      .then(() => dispatch(registerSuccess()))
      .then(() => dispatch(userLogin(email, password)))
      .catch((error) => dispatch(registerFailure(error)));
  };
};

//----------------------------------------------------------------------//

export const updateProfileRequest = () => ({
  type: UserActionTypes.UPDATE_PROFILE_REQUEST,
});
export const updateProfileSuccess = (data) => ({
  type: UserActionTypes.UPDATE_PROFILE_SUCCESS,
  payload: data,
});
export const updateProfileFailure = (error) => ({
  type: UserActionTypes.UPDATE_PROFILE_FAILURE,
  payload: error,
});

export const updateProfile = (data) => {
  return (dispatch, getState) => {
    dispatch(updateProfileRequest());
    const token = getState().user.token;
    updateProfileService(data, token)
      .then((data) => dispatch(updateProfileSuccess(data)))
      .catch((error) => dispatch(updateProfileFailure(error)));
  };
};

//----------------------------------------------------------------------//

export const fetchNotificationsRequest = () => ({
  type: UserActionTypes.FETCH_NOTIFICATION_REQUEST,
});

export const fetchNotificationsSuccess = (data) => ({
  type: UserActionTypes.FETCH_NOTIFICATION_SUCCESS,
  payload: data,
});

export const fetchNotificationsFailure = (error) => ({
  type: UserActionTypes.FETCH_NOTIFICATION_FAILURE,
  payload: error,
});

export const fetchNotifications = () => {
  return (dispatch, getState) => {
    dispatch(fetchNotificationsRequest());
    const token = getState().user.token;
    fetchNotificationsService(token)
      .then((data) => dispatch(fetchNotificationsSuccess(data)))
      .catch((error) => dispatch(fetchNotificationsFailure(error)));
  };
};

export const readNotification = (id) => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    dispatch(readNotificationService(token, id));
  };
};

export const replyAGradeReviewRequest = () => ({
  type: UserActionTypes.REPLY_A_GRADE_REVIEW_REQUEST,
});

export const replyAGradeReviewSuccess = () => ({
  type: UserActionTypes.REPLY_A_GRADE_REVIEW_SUCCESS,
});

export const replyAGradeReviewFailure = (error) => ({
  type: UserActionTypes.REPLY_A_GRADE_REVIEW_FAILURE,
  payload: error,
});

export const replyAGradeReview = (data, id) => {
  return (dispatch, getState) => {
    dispatch(replyAGradeReviewRequest());
    const token = getState().user.token;
    replyAGradeReviewByIDService(token, id, data)
      .then(() => dispatch(replyAGradeReviewSuccess()))
      .catch((error) => dispatch(replyAGradeReviewFailure(error)));
  };
};

export const notifyGradeReviewRequest = () => ({
  type: UserActionTypes.NOTIFY_GRADE_REVIEW_REQUEST,
});

export const notifyGradeReviewSuccess = () => ({
  type: UserActionTypes.NOTIFY_GRADE_REVIEW_SUCCESS,
});

export const notifyGradeReviewFailure = (error) => ({
  type: UserActionTypes.NOTIFY_GRADE_REVIEW_FAILURE,
  payload: error,
});

export const notifyGradeReview = (data) => {
  return (dispatch, getState) => {
    dispatch(notifyGradeReviewRequest());
    const token = getState().user.token;
    notifyGradeReviewService(token, data)
      .then(() => dispatch(notifyGradeReviewSuccess()))
      .catch((error) => dispatch(notifyGradeReviewFailure(error)));
  };
};
