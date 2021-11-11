import ClassroomsActionTypes from "./classrooms.types";
import {
  fetchClassroomsService,
  findOwnerFullname,
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

export const fetchClassrooms = (user, token) => {
  return (dispatch) => {
    dispatch(fetchClassroomsRequest());
    fetchClassroomsService(user, token)
      .then((data) => {
        Promise.all(findOwnerFullname(data, token))
          .then((res) => dispatch(fetchClassroomsSuccess(res)))
          .catch((error) => dispatch(fetchClassroomsFailure(error)));
      })
      .catch((error) => dispatch(fetchClassroomsFailure(error)));
  };
};

//-------------------------------------------------------

export const clearClassrooms = () => ({
  type: ClassroomsActionTypes.CLEAR_CLASSROOMS,
});

//-------------------------------------------------------
