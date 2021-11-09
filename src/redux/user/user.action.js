import UserActionTypes from "./user.types";
import { userLoginService, userRegisterService } from "./user.services";
import { clearClassrooms } from "../classroom/classroom.actions";

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

export const logout = () => ({
  type: UserActionTypes.LOGOUT,
});

export const userLogout = () => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(clearClassrooms());
  };
};

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
