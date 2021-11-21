import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import { selectIsLoading, selectIsUpdating } from "../redux/user/user.selector";
import {
  selectIsFetchingClassrooms,
  selectIsJoiningClassroom,
} from "../redux/classrooms/classrooms.selector";
import {
  selectIsCreatingAClassroom,
  selectIsFetchingAClassroom,
} from "../redux/classroom/classroom.selector";
import { createStructuredSelector } from "reselect";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({
    isLoading,
    isFetchingClassrooms,
    isFetchingAClassroom,
    isCreatingAClassroom,
    isJoiningClassroom,
    isUpdating,
    ...otherProps
  }) => {
    const isProcessing =
      isLoading ||
      isFetchingClassrooms ||
      isCreatingAClassroom ||
      isJoiningClassroom ||
      isUpdating ||
      isFetchingAClassroom;
    return (
      <>
        {isProcessing && (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              zIndex: "99",
              position: "absolute",
            }}
          >
            <CircularProgress style={{ alignSelf: "center", margin: "auto" }} />
          </div>
        )}
        <div
          style={{
            opacity: isUpdating ? "0" : isProcessing ? "0.3" : "1",
            height: "100%",
          }}
        >
          <WrappedComponent {...otherProps} />
        </div>
      </>
    );
  };
  return connect(mapState)(Spinner);
};

const mapState = createStructuredSelector({
  isLoading: selectIsLoading,
  isFetchingClassrooms: selectIsFetchingClassrooms,
  isFetchingAClassroom: selectIsFetchingAClassroom,
  isJoiningClassroom: selectIsJoiningClassroom,
  isCreatingAClassroom: selectIsCreatingAClassroom,
  isUpdating: selectIsUpdating,
});

export default WithSpinner;
