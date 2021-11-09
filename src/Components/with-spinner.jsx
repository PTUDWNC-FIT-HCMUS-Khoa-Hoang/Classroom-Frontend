import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import { selectIsLoading } from "../redux/user/user.selector";
import { selectIsFetching } from "../redux/classroom/classroom.selector";
import { createStructuredSelector } from "reselect";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, isFetching, ...otherProps }) => {
    const isProcessing = isLoading || isFetching;
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
  isFetching: selectIsFetching,
});

export default WithSpinner;
