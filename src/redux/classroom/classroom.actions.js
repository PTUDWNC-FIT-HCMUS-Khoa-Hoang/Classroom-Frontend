import ClassroomActionTypes from "./classroom.types";
import {
  createAClassroomService,
  fetchAClassroomService,
  updateClassroomService,
} from "./classroom.services";
import { fetchClassrooms } from "../classrooms/classrooms.actions";

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

export const fetchAClassroom = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchAClassroomRequest());
    const token = getState().user.token;
    fetchAClassroomService(token, id)
      .then((data) => dispatch(fetchAClassroomSuccess(data)))
      .catch((error) => dispatch(fetchAClassroomFailure(error)));
  };
};

export const closeClassroom = () => ({
  type: ClassroomActionTypes.CLOSE_CLASSROOM,
});

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

export const updateClassroomRequest = () => ({
  type: ClassroomActionTypes.UPDATE_CLASSROOM_REQUEST,
});

export const updateClassroomSuccess = () => ({
  type: ClassroomActionTypes.UPDATE_CLASSROOM_SUCCESS,
});

export const updateClassroomFailure = (error) => ({
  type: ClassroomActionTypes.UPDATE_CLASSROOM_FAILURE,
  payload: error,
});

export const createAClassroom = (title) => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    dispatch(createAClassroomRequest());
    createAClassroomService(title, token)
      .then(() => dispatch(createAClassroomSuccess()))
      .then(() => dispatch(fetchClassrooms(token)))
      .catch((error) => dispatch(createAClassroomFailure(error)));
  };
};

export const updateClassroom = (data) => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const classroomId = getState().classroom.classroom._id;
    dispatch(updateClassroomRequest());
    updateClassroomService(data, classroomId, token)
      .then(() => dispatch(updateClassroomSuccess()))
      .then(() => dispatch(fetchAClassroom(classroomId)))
      .catch((error) => dispatch(updateClassroomFailure(error)));
  };
};
