import { createSelector } from "reselect";

const selectorClassrooms = (state) => state.classrooms;

export const selectClassrooms = createSelector(
  [selectorClassrooms],
  (classrooms) => classrooms.classrooms
);

export const selectIsFetchingClassrooms = createSelector(
  [selectorClassrooms],
  (classrooms) => classrooms.isFetchingClassrooms
);

export const selectIsJoiningClassroom = createSelector(
  [selectorClassrooms],
  (classrooms) => classrooms.isJoining
);

export const selectError = createSelector(
  [selectorClassrooms],
  (classrooms) => classrooms.classroomError
);

export const selectJoinClassroomError = createSelector(
  [selectorClassrooms],
  (classrooms) => classrooms.joinClassroomErrorMessage
);
