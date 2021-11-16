import ClassroomsActionTypes from "./classrooms.types";
import { fetchClassroomsService } from "./classrooms.services";

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
