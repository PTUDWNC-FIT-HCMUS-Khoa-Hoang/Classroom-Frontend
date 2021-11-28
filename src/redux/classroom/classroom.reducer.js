import ClassroomActionTypes from "./classroom.types";

const INITIAL_STATE = {
  classroom: null,
  participants: [],
  isCreatingAClassroom: false,
  classroomError: null,
  isFetchingAClassroom: false,
  isUpdating: false,
};

const classroomReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ClassroomActionTypes.CREATE_A_CLASSROOM_REQUEST:
      return {
        ...state,
        isCreatingAClassroom: true,
      };
    case ClassroomActionTypes.CREATE_A_CLASSROOM_SUCCESS:
      return {
        ...state,
        isCreatingAClassroom: false,
      };
    case ClassroomActionTypes.CREATE_A_CLASSROOM_FAILURE:
      return {
        ...state,
        isCreatingAClassroom: false,
        classroomError: payload,
      };
    case ClassroomActionTypes.FETCH_A_CLASSROOM_REQUEST:
      return {
        ...state,
        isFetchingAClassroom: true,
      };
    case ClassroomActionTypes.FETCH_A_CLASSROOM_SUCCESS:
      return {
        ...state,
        isFetchingAClassroom: false,
        classroom: payload.classroom,
        participants: payload.participants,
      };
    case ClassroomActionTypes.FETCH_A_CLASSROOM_FAILURE:
      return {
        ...state,
        isFetchingAClassroom: false,
        classroomError: payload,
      };
    case ClassroomActionTypes.UPDATE_CLASSROOM_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case ClassroomActionTypes.UPDATE_CLASSROOM_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      };
    case ClassroomActionTypes.UPDATE_CLASSROOM_FAILURE:
      return {
        ...state,
        isUpdating: false,
        classroomError: payload,
      };
    case ClassroomActionTypes.CLOSE_CLASSROOM:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default classroomReducer;
