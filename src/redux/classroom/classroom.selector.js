import { createSelector } from "reselect";

const selectorClassroom = (state) => state.classroom;

export const selectAClassroom = createSelector(
  [selectorClassroom],
  (clasroom) => clasroom.classroom
);

export const selectParticipants = createSelector(
  [selectorClassroom],
  (clasroom) => clasroom.participants
);

export const selectIsCreatingAClassroom = createSelector(
  [selectorClassroom],
  (classroom) => classroom.isCreatingAClassroom
);

export const selectIsFetchingAClassroom = createSelector(
  [selectorClassroom],
  (classroom) => classroom.isFetchingAClassroom
);
