import ClassroomsActionTypes from "./classrooms.types";

const INITIAL_STATE = {
  classrooms: null,
  classroomsError: null,
  isFetchingClassrooms: false,
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
    default:
      return state;
  }
};

export default classroomsReducer;
