import { createSelector } from "reselect";

const sUser = (state) => state.user;

export const selectUser = createSelector([sUser], (user) => user.user);

export const selectIsWrongAccount = createSelector(
  [sUser],
  (user) => user.isWrongAccount
);

export const selectIsLoading = createSelector(
  [sUser],
  (user) => user.isLoading
);

export const selectToken = createSelector([sUser], (user) => user.token);

export const selectIsInvalidEmail = createSelector(
  [sUser],
  (user) => user.isInvalidEmail
);

export const selectError = createSelector([sUser], (user) => user.error);
