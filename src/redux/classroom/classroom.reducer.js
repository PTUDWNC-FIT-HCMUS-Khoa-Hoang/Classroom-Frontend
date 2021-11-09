import ClassroomActionTypes from "./classroom.types";

const INITIAL_STATE = {
  classrooms: [],
  classroom: null,
  error: null,
  isFetching: false,
  isOpenAClassroom: false,
};

const classroomReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ClassroomActionTypes.CREATE_A_CLASSROOM_REQUEST:
    case ClassroomActionTypes.CREATE_A_CLASSROOM_SUCCESS:
    case ClassroomActionTypes.FETCH_CLASSROOMS_REQUEST:
      return {
        ...INITIAL_STATE,
        isFetching: true,
      };
    case ClassroomActionTypes.FETCH_CLASSROOMS_SUCCESS:
      return {
        ...INITIAL_STATE,
        classrooms: payload,
      };
    case ClassroomActionTypes.CREATE_A_CLASSROOM_FAILURE:
    case ClassroomActionTypes.FETCH_CLASSROOMS_FAILURE:
      return {
        ...state,
        error: payload,
        isFetching: false,
        isCreating: false,
      };
    case ClassroomActionTypes.CLEAR_CLASSROOMS:
      return {
        ...state,
        classrooms: null,
      };
    case ClassroomActionTypes.FETCH_A_CLASSROOM_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ClassroomActionTypes.FETCH_A_CLASSROOM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isOpenAClassroom: true,
        classroom: payload,
      };
    case ClassroomActionTypes.FETCH_A_CLASSROOM_FAILURE:
      return {
        ...state,
        isFetching: false,
        isOpenAClassroom: false,
        error: payload,
      };
    case ClassroomActionTypes.CLOSE_CLASSROOM:
      return {
        ...state,
        isOpenAClassroom: false,
      };
    default:
      return state;
  }
};

export default classroomReducer;
