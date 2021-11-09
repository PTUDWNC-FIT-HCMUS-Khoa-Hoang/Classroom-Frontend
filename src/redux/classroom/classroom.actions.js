import ClassroomActionTypes from "./classroom.types";
import {
  fetchClassroomsService,
  createAClassroomService,
} from "./classroom.services";

export const fetchClassroomsRequest = () => ({
  type: ClassroomActionTypes.FETCH_CLASSROOMS_REQUEST,
});

export const fetchClassroomsSuccess = (classList) => ({
  type: ClassroomActionTypes.FETCH_CLASSROOMS_SUCCESS,
  payload: classList,
});

export const fetchClassroomsFailure = (error) => ({
  type: ClassroomActionTypes.FETCH_CLASSROOMS_FAILURE,
  payload: error,
});

export const fetchClassrooms = (user, token) => {
  return (dispatch) => {
    dispatch(fetchClassroomsRequest());
    fetchClassroomsService(user, token)
      .then((data) => dispatch(fetchClassroomsSuccess(data)))
      .catch((error) => dispatch(fetchClassroomsFailure(error)));
  };
};

//-------------------------------------------------------

export const clearClassrooms = () => ({
  type: ClassroomActionTypes.CLEAR_CLASSROOMS,
});

//-------------------------------------------------------

export const createAClassroomRequest = () => ({
  type: ClassroomActionTypes.CREATE_A_CLASSROOM_REQUEST,
});

export const createAClassroomSuccess = () => ({
  type: ClassroomActionTypes.CREATE_A_CLASSROOM_SUCCESS,
});

export const createAClassroomFailure = (error) => ({
  type: ClassroomActionTypes.CREATE_A_CLASSROOM_FAILURE,
  payload: error,
});

export const createAClassroom = (user, title, token) => {
  return (dispatch) => {
    dispatch(createAClassroomRequest());
    createAClassroomService(user, title, token)
      .then(() => dispatch(createAClassroomSuccess()))
      .then(() => dispatch(fetchClassrooms(user, token)))
      .catch((error) => dispatch(createAClassroomFailure(error)));
  };
};

//-------------------------------------------------------

export const fetchAClassroomRequest = () => ({
  type: ClassroomActionTypes.FETCH_A_CLASSROOM_REQUEST,
});

export const fetchAClassroomSuccess = (classroom) => ({
  type: ClassroomActionTypes.FETCH_A_CLASSROOM_SUCCESS,
  payload: classroom,
});

export const fetchAClassroomFailure = (error) => ({
  type: ClassroomActionTypes.FETCH_A_CLASSROOM_FAILURE,
  payload: error,
});

export const fetchAClassroom = () => {
  return (dispatch) => {
    dispatch(fetchAClassroomRequest());
    dispatch(fetchAClassroomSuccess({ title: "OOP" }));
    // dispatch(fetchAClassroomFailure());
  };
};

export const closeClassroom = () => ({
  type: ClassroomActionTypes.CLOSE_CLASSROOM,
});
