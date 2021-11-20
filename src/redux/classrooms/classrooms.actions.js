import ClassroomsActionTypes from "./classrooms.types";
import {
  fetchClassroomsService,
  joinByInvitationCodeService,
} from "./classrooms.services";

export const fetchClassroomsRequest = () => ({
  type: ClassroomsActionTypes.FETCH_CLASSROOMS_REQUEST,
});

export const fetchClassroomsSuccess = (classList) => ({
  type: ClassroomsActionTypes.FETCH_CLASSROOMS_SUCCESS,
  payload: classList,
});

export const fetchClassroomsFailure = (error) => ({
  type: ClassroomsActionTypes.FETCH_CLASSROOMS_FAILURE,
  payload: error,
});

export const fetchClassrooms = () => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    dispatch(fetchClassroomsRequest());
    fetchClassroomsService(token)
      .then((data) => dispatch(fetchClassroomsSuccess(data)))
      .catch((error) => dispatch(fetchClassroomsFailure(error)));
  };
};

//-------------------------------------------------------

export const clearClassrooms = () => ({
  type: ClassroomsActionTypes.CLEAR_CLASSROOMS,
});

//-------------------------------------------------------

export const joinClassroomByInvitationCodeRequest = () => ({
  type: ClassroomsActionTypes.JOIN_CLASSROOM_BY_INVITAION_CODE_REQUEST,
});

export const joinClassroomByInvitationCodeSuccess = () => ({
  type: ClassroomsActionTypes.JOIN_CLASSROOM_BY_INVITAION_CODE_SUCCESS,
});

export const joinClassroomByInvitationCodeFailure = (error) => ({
  type: ClassroomsActionTypes.JOIN_CLASSROOM_BY_INVITAION_CODE_FAILURE,
  payload: error,
});

export const joinByInvitationCode = (invitationCode) => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    dispatch(joinClassroomByInvitationCodeRequest());
    joinByInvitationCodeService(invitationCode, token)
      .then(
        (data) =>
          (window.location.href =
            window.location.origin + `/classrooms/${data?.classroomId}`)
      )
      .then(() => dispatch(joinClassroomByInvitationCodeSuccess()))
      .catch((error) => dispatch(joinClassroomByInvitationCodeFailure(error)));
  };
};

//-------------------------------------------------------
