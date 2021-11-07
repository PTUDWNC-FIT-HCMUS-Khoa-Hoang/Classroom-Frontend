import UserActionTypes from "./user.types";
import userLoginService from "./user.services";

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

const userLogin = (email, password) => {
  return (dispatch) => {
    dispatch(emailLoginRequest());
    userLoginService(email, password)
      .then((data) => dispatch(emailLoginSuccess(data.user, data.token)))
      .catch((error) => dispatch(emailLoginFailure(error)));
  };
};

export default userLogin;

export const userLogout = () => ({
  type: UserActionTypes.LOGOUT,
});
