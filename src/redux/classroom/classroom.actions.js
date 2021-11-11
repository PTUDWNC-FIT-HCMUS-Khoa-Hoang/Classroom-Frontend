import ClassroomActionTypes from "./classroom.types";
import { createAClassroomService } from "./classroom.services";
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

export const fetchAClassroom = (index) => {
  return (dispatch, getState) => {
    dispatch(fetchAClassroomRequest());
    dispatch(
      fetchAClassroomSuccess(
        getState().classrooms.classrooms[+index] || {
          _id: "618ba6e971ce6f65fe0562ab",
          title: "131123",
          owner: "6188f087d3d5594b137dd8ed",
          gradings: [],
          createdAt: "2021-11-10T11:03:05.296Z",
          updatedAt: "2021-11-10T11:03:05.296Z",
          __v: 0,
          ownerFullname: "1",
        }
      )
    );
    // dispatch(fetchAClassroomFailure());
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

export const createAClassroom = (user, title, token) => {
  return (dispatch) => {
    createAClassroomService(user, title, token)
      .then(() => dispatch(createAClassroomRequest()))
      .then(() => dispatch(createAClassroomSuccess()))
      .then(() => dispatch(fetchClassrooms(user, token)))
      .catch((error) => dispatch(createAClassroomFailure(error)));
  };
};
