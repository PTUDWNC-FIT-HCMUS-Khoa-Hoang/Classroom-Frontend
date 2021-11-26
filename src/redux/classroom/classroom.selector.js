import { createSelector } from "reselect";

const selectorClassroom = (state) => state.classroom;

export const selectAClassroom = createSelector(
  [selectorClassroom],
  (classroom) => classroom.classroom
);

export const selectParticipants = createSelector(
  [selectorClassroom],
  (classroom) => classroom.participants
);

export const selectIsCreatingAClassroom = createSelector(
  [selectorClassroom],
  (classroom) => classroom.isCreatingAClassroom
);

export const selectIsFetchingAClassroom = createSelector(
  [selectorClassroom],
  (classroom) => classroom.isFetchingAClassroom
);
