import ClassroomActionTypes from "./classroom.types";

const INITIAL_STATE = {
  classrooms: null,
  error: null,
  isFetching: true,
};

const classroomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClassroomActionTypes.CREATE_A_CLASSROOM_REQUEST:
    case ClassroomActionTypes.CREATE_A_CLASSROOM_SUCCESS:
    case ClassroomActionTypes.FETCH_CLASSROOMS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ClassroomActionTypes.FETCH_CLASSROOMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        classrooms: action.payload,
      };
    case ClassroomActionTypes.CREATE_A_CLASSROOM_FAILURE:
    case ClassroomActionTypes.FETCH_CLASSROOMS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isCreating: false,
      };
    default:
      return state;
  }
};

export default classroomReducer;
