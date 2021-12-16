import ClassroomActionTypes from "./classroom.types";
import {
  createAClassroomService,
  fetchAClassroomService,
  updateClassroomService,
  uploadStudentListService,
  uploadGradeForAnAssignmentService,
  getGradesByClassroomService,
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

export const uploadStudentListRequest = () => ({
  type: ClassroomActionTypes.UPLOAD_STUDENT_LIST_REQUEST,
});

export const uploadStudentListSuccess = (data) => ({
  type: ClassroomActionTypes.UPLOAD_STUDENT_LIST_SUCCESS,
  payload: data,
});

export const uploadStudentListFailure = (error) => ({
  type: ClassroomActionTypes.UPLOAD_STUDENT_LIST_FAILURE,
  payload: error,
});

export const uploadStudentList = (formData) => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const classroomId = getState().classroom.classroom._id;
    dispatch(uploadStudentListRequest());
    uploadStudentListService(classroomId, token, formData)
      .then((data) => dispatch(uploadStudentListSuccess(data)))
      .catch((error) => dispatch(uploadStudentListFailure(error)));
  };
};

export const uploadGradeForAnAssignmentRequest = () => ({
  type: ClassroomActionTypes.UPLOAD_GRADE_FOR_AN_ASSIGNMENT_REQUEST,
});

export const uploadGradeForAnAssignmentSuccess = (data) => ({
  type: ClassroomActionTypes.UPLOAD_GRADE_FOR_AN_ASSIGNMENT_SUCCESS,
  payload: data,
});

export const uploadGradeForAnAssignmentFailure = (error) => ({
  type: ClassroomActionTypes.UPLOAD_GRADE_FOR_AN_ASSIGNMENT_FAILURE,
  payload: error,
});

export const uploadGradeForAnAssignment = (formData, gradeId) => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const classroomId = getState().classroom.classroom._id;
    dispatch(uploadGradeForAnAssignmentRequest());
    uploadGradeForAnAssignmentService(classroomId, gradeId, token, formData)
      .then((data) => dispatch(uploadGradeForAnAssignmentSuccess(data)))
      .then(() => dispatch(getGradesByClassroom()))
      .catch((error) => dispatch(uploadGradeForAnAssignmentFailure(error)));
  };
};

export const getGradesByClassroomRequest = () => ({
  type: ClassroomActionTypes.GET_GRADES_BY_CLASSROOM_REQUEST,
});

export const getGradesByClassroomSuccess = (data) => ({
  type: ClassroomActionTypes.GET_GRADES_BY_CLASSROOM_SUCCESS,
  payload: data,
});

export const getGradesByClassroomFailure = (error) => ({
  type: ClassroomActionTypes.GET_GRADES_BY_CLASSROOM_FAILURE,
  payload: error,
});

export const getGradesByClassroom = () => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    const classroomId = getState().classroom.classroom._id;
    dispatch(getGradesByClassroomRequest());
    getGradesByClassroomService(classroomId, token)
      .then((data) => dispatch(getGradesByClassroomSuccess(data)))
      .catch((error) => dispatch(getGradesByClassroomFailure(error)));
  };
};
