import ClassroomsActionTypes from "./classrooms.types";

const INITIAL_STATE = {
  classrooms: null,
  classroomsError: null,
  isFetchingClassrooms: false,
  isJoining: false,
  joinClassroomErrorMessage: null,
};

const classroomsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ClassroomsActionTypes.FETCH_CLASSROOMS_REQUEST:
      return {
        ...state,
        isFetchingClassrooms: true,
      };
    case ClassroomsActionTypes.FETCH_CLASSROOMS_SUCCESS:
      return {
        ...state,
        isFetchingClassrooms: false,
        classrooms: payload,
      };
    case ClassroomsActionTypes.FETCH_CLASSROOMS_FAILURE:
      return {
        ...state,
        classroomsError: payload,
        isFetchingClassrooms: false,
      };
    case ClassroomsActionTypes.CLEAR_CLASSROOMS:
      return {
        ...state,
        classrooms: null,
      };
    case ClassroomsActionTypes.JOIN_CLASSROOM_BY_INVITAION_CODE_REQUEST:
      return {
        ...state,
        isJoining: true,
        joinClassroomErrorMessage: null,
      };
    case ClassroomsActionTypes.JOIN_CLASSROOM_BY_INVITAION_CODE_SUCCESS:
      return {
        ...state,
        isJoining: false,
        joinClassroomErrorMessage: null,
      };
    case ClassroomsActionTypes.JOIN_CLASSROOM_BY_INVITAION_CODE_FAILURE:
      return {
        ...state,
        isJoining: false,
        joinClassroomErrorMessage: payload.response.data.message,
      };
    default:
      return state;
  }
};

export default classroomsReducer;
