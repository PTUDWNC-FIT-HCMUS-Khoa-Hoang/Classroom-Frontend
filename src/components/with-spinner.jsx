import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ ...otherProps }) => {
    const isLoading = useSelector(({ user }) => user.isLoading);
    const isFetchingClassrooms = useSelector(
      ({ classrooms }) => classrooms.isFetchingClassrooms
    );
    const isJoiningClassroom = useSelector(
      ({ classrooms }) => classrooms.isJoining
    );
    const isFetchingAClassroom = useSelector(
      ({ classroom }) => classroom.isFetchingAClassroom
    );
    const isCreatingAClassroom = useSelector(
      ({ classroom }) => classroom.isCreatingAClassroom
    );
    const isUpdating = useSelector(({ user }) => user.isUpdating);
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
  return Spinner;
};

export default WithSpinner;
