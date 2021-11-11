import { createSelector } from "reselect";

const selectorClassroom = (state) => state.classroom;

export const selectAClassroom = createSelector(
  [selectorClassroom],
  (clasroom) => clasroom.classroom
);

export const selectIsOpenAClassroom = createSelector(
  [selectorClassroom],
  (clasroom) => clasroom.isOpenAClassroom
);

export const selectIsCreatingAClassroom = createSelector(
  [selectorClassroom],
  (classroom) => classroom.isCreatingAClassroom
);
