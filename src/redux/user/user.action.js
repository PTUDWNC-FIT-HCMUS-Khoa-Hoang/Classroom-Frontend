import UserActionTypes from "./user.types";
import {
  userLoginService,
  userRegisterService,
  updateProfileService,
  googleLoginService,
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
