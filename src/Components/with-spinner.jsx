import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import { selectIsLoading } from "../redux/user/user.selector";
import { selectIsFetchingClassrooms } from "../redux/classrooms/classrooms.selector";
import { selectIsCreatingAClassroom } from "../redux/classroom/classroom.selector";
import { createStructuredSelector } from "reselect";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({
    isLoading,
    isFetchingClassrooms,
    isCreatingAClassroom,
    ...otherProps
  }) => {
    const isProcessing =
      isLoading || isFetchingClassrooms || isCreatingAClassroom;
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
        <div style={{ opacity: isProcessing ? "0.3" : "1", height: "100%" }}>
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
  isCreatingAClassroom: selectIsCreatingAClassroom,
});

export default WithSpinner;
