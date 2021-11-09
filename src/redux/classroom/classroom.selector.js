import { createSelector } from "reselect";

const selectorClassroom = (state) => state.classroom;

export const selectClassroom = createSelector(
  [selectorClassroom],
  (clasroom) => clasroom.classrooms
);

export const selectIsFetching = createSelector(
  [selectorClassroom],
  (classroom) => classroom.isFetching
);

export const selectError = createSelector(
  [selectorClassroom],
  (classroom) => classroom.error
);

export const selectIsOpenAClassroom = createSelector(
  [selectorClassroom],
  (classroom) => classroom.isOpenAClassroom
);
